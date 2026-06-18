import { useState, useRef, useEffect } from "react";

// Compact student DB - stored as array [id, password, roll, name]
const RAW = [
["2150001","2152500001","1","ALAMIN SK"],["2150002","2152500002","2","ALIYA KHATUN"],["2150003","2152500003","3","ANAMIKA MONDAL"],["2150004","2152500004","4","ASRAFUL MONDAL"],["2150005","2152500005","5","BRISTI KARMAKAR"],["2150006","2152500006","6","DILRUBA KHATUN"],["2150007","2152500007","7","FARHANA SULTANA"],["2150008","2152500008","8","HASNAHANA KHANAM"],["2150009","2152500009","9","JAMIR ALI"],["2150010","2152500010","10","KABIRUL SK"],["2150011","2152500012","12","LAXMIPRIYA DAS"],["2150012","2152500013","13","MAJIDUL SK"],["2150013","2152500014","14","MAMANI KHATUN"],["2150014","2152500015","15","MAMONI KHATUN"],["2150015","2152500016","16","MANTI PRAMANIK"],["2150016","2152500017","17","MIHIR DAS"],["2150017","2152500018","18","MITRA DAS"],["2150018","2152500019","19","MITU CHOWDHURY"],["2150019","2152500020","20","MOMINA KHATUN"],["2150020","2152500021","21","MUSLIMA KHATUN"],["2150021","2152500022","22","NAJMA SULTANA"],["2150022","2152500023","23","PALLABI MANDAL"],["2150023","2152500024","24","PRIYANKA GHOSH"],["2150024","2152500025","25","RABIA KHATUN"],["2150025","2152500026","26","RAHUL MALITHYA"],["2150026","2152500027","27","RIYA KHATUN"],["2150027","2152500028","28","SABINA KHATUN"],["2150028","2152500029","29","SABNAJ PARVIN"],["2150029","2152500030","30","SABNAM JUHI"],["2150030","2152500031","31","SAHARIYA MONDAL"],["2150031","2152500032","32","SAHIDA KHATUN"],["2150032","2152500033","33","SAHIDA KHATUN"],["2150033","2152500034","34","SAILA SARMIN"],["2150034","2152500035","35","SAMARUL MALITHYA"],["2150035","2152500036","36","SAMIMA KHATUN"],["2150036","2152500037","37","SHRABONI MONDAL"],["2150037","2152500038","38","SUMANA GHOSH"],["2150038","2152500039","39","SUMONA KHATUN"],["2150039","2152500040","40","SURAIYA YEASMIN"],["2150040","2152500041","41","SURAYA YEASMIN"],["2150041","2152500042","42","SWASTIKA PAL"],["2150042","2152500043","43","TAMIRUL MONDAL"],["2150043","2152500044","44","TAUFIK HASAN RIJU"],["2150044","2152500047","3","AJIJUL HOQUE MONDA"],["2150045","2152500048","4","AKASH SARKAR"],["2150046","2152500049","5","DEB MONDAL"],["2150047","2152500050","6","FARDIN ALI MONDAL"],["2150048","2152500052","8","IMRUL KAIS"],["2150049","2152500053","9","MIJANUR RAHAMAN"],["2150050","2152500054","10","MINAJUL SHAIKH"],["2150051","2152500055","11","MINTAJUL SK"],["2150052","2152500056","12","MOTIUR RAHAMAN HO"],["2150053","2152500059","15","RAHUL SK"],["2150054","2152500060","16","RAJIB SK"],["2150055","2152500062","18","SABIR AHAMMED BISW"],["2150056","2152500063","19","SAFI SK"],["2150057","2152500064","20","SAFIK HASAN"],["2150058","2152500065","21","SAJIBUL SK"],["2150059","2152500066","22","SAMIUL HASAN"],["2150060","2152500067","23","SOUVIK MONDAL"],["2150061","2152500068","24","SUBHADIP PRAMANIK"],["2150062","2152500069","25","SUBHANKAR MONDAL"],["2150063","2152500070","26","TUHIN SHAIKH"],["2150064","2152500071","1","AMIR SOHEL MONDAL"],["2150065","2152500072","2","ARSHIDA KHATUN"],["2150066","2152500073","3","FATEMA KHATUN"],["2150067","2152500074","4","RABIUL MANDAL"],["2150068","2152500075","5","SAMIM SK"],["2150069","2152500076","6","SURAIYA PARVIN"],["2150070","2152500077","1","AEASHA SIDDIKA"],["2150071","2152500078","2","AYUSH MONDAL"],["2150072","2152500079","3","JAHIDA ALAM SULTANA"],["2150073","2152500080","4","JANNATON KHATUN"],["2150074","2152500081","5","KOYEL MONDAL"],["2150075","2152500082","6","MARIA JAFRIN"],["2150076","2152500083","7","MIRAJUL ISLAM MONDA"],["2150077","2152500084","8","MOUSUMI KHATUN"],["2150078","2152500085","9","MUSKAN BANU"],["2150079","2152500086","10","NAJEMA KHATUN"],["2150080","2152500087","11","NAJIYA KHATUN"],["2150081","2152500088","12","NURJAHAN KHATUN"],["2150082","2152500089","13","OLIVIA SERENE"],["2150083","2152500090","14","PIU SARKAR"],["2150084","2152500091","15","RIYAJ MONDAL"],["2150085","2152500092","16","SAHANUL ISLAM"],["2150086","2152500093","17","SANGITA MAL PAHARIY"],["2150087","2152500094","1","AMMAR HOSSAIN"],["2150088","2152500095","2","FIROJ AHMED"],["2150089","2152500096","3","JAHANGIR SK"],["2150090","2152500097","4","TOUHID HASSAN MOLL"],["2150091","2152500098","5","YERAKUL MOLLA"],["2150092","2152500099","1","ABDULLA MONDAL"],["2150093","2152500100","2","AYESHA SIDDIKA"],["2150094","2152500101","3","FIRDOS MONDAL"],["2150095","2152500103","5","MD NAJIBUL ISLAM"],["2150096","2152500105","7","MUKLESUR RAHAMAN"],["2150097","2152500106","8","NAJMA SULTANA"],["2150098","2152500107","9","SABANA NAZMIN"],["2150099","2152500108","10","SAHANAJ KHATUN"],["2150100","2152500110","12","SANOWAR SHAH"],["2150101","2152500111","13","SHIPRA MONDAL"],["2150102","2152500112","14","SOVANA PARVIN"],["2150103","2152500113","15","TAMANNA SULTANA"],["2150104","2152500114","1","ABDUL HASNAT IKBAL"],["2150105","2152500115","2","ABDUL MOBALLEGIN M"],["2150106","2152500116","3","ABU JAYAD ALI"],["2150107","2152500117","4","AKASH DAS"],["2150108","2152500118","5","AKTARUJJAMAN SK"],["2150109","2152500119","6","ARJUMA KHATUN"],["2150110","2152500120","7","ASIF HOSSAIN"],["2150111","2152500121","8","ASLIMA KHATUN"],["2150112","2152500122","9","AZIZA SULTANA"],["2150113","2152500123","10","CHANDSETARA KHATU"],["2150114","2152500124","11","FARHANA KHATUN"],["2150115","2152500125","12","HABIBA KHATUN"],["2150116","2152500126","13","HALIMA KHATUN"],["2150117","2152500127","14","HAMIDA KHATUN"],["2150118","2152500128","15","HASANUJJAMAN SK"],["2150119","2152500129","16","HASIBUL SK"],["2150120","2152500130","17","ISMETARA KHATUN"],["2150121","2152500131","18","KAMRUJJAMAN ALI"],["2150122","2152500132","19","KARIMA KHATUN"],["2150123","2152500133","20","KOWSER ALI MONDAL"],["2150124","2152500134","21","KOYESH SK"],["2150125","2152500135","22","MAFUJA KHATUN"],["2150126","2152500136","23","MAHABOOB HASAN"],["2150127","2152500137","24","MAHAROP ALI SEKH"],["2150128","2152500138","25","MAMOTAJ BEGAM"],["2150129","2152500139","26","MARUF HASAN"],["2150130","2152500140","27","MEHEDI HASAN"],["2150131","2152500141","28","NASRIN KHATUN"],["2150132","2152500142","29","NOUSILA KHATUN"],["2150133","2152500143","30","NOWRAJ ALI"],["2150134","2152500144","31","NURSILA KHATUN"],["2150135","2152500145","32","PUJA GHOSH"],["2150136","2152500146","33","PUJA DAS BAIRAGYA"],["2150137","2152500147","34","RAHAMAN SK"],["2150138","2152500148","35","RAJIBUL MANDAL"],["2150139","2152500149","36","RAKI MONDAL"],["2150140","2152500150","37","RAMIJ MONDAL"],["2150141","2152500151","38","RAMJAN ALI SEKH"],["2150142","2152500152","39","RANI HASAN KHALIFA"],["2150143","2152500153","40","RIAJ MOHAMMAD"],["2150144","2152500154","41","RIMPA KHATUN"],["2150145","2152500155","42","SABIR ALI"],["2150146","2152500156","43","SADIKUL SAIKH"],["2150147","2152500157","44","SAHIN REJA MONDAL"],["2150148","2152500158","45","SAIBA KHATUN"],["2150149","2152500159","46","SAINUL MONDAL"],["2150150","2152500160","47","SAJJAD HOSSAIN"],["2150151","2152500161","48","SAKIL SK"],["2150152","2152500162","49","SAMIM SK"],["2150153","2152500163","50","SANJIBUL ISLAM"],["2150154","2152500164","51","SANJIDAHA KHATUN"],["2150155","2152500165","52","SARIFA KHATUN"],["2150156","2152500166","53","SARMINA KHATUN"],["2150157","2152500167","54","SEULI KHATUN"],["2150158","2152500168","55","SHAHJAHAN MONDAL"],["2150159","2152500169","56","SOHAN AKTER"],["2150160","2152500170","57","SUFIYA KHANAM"],["2150161","2152500171","58","SUPRIYA KHATUN"],["2150162","2152500172","59","SURAJ SAIKH"],["2150163","2152500173","60","SURMILA KHATUN"],["2150164","2152500174","61","TAHID KHAN"],["2150165","2152500175","62","TAHIDUL ISLAM MONDA"],["2150166","2152500176","63","TOUFIK AHAMMED MO"],["2150167","2152500177","64","URMILA KHATUN"],["2150168","2152500178","1","ABDUL MOTTALEB"],["2150169","2152500179","2","AJMIRA KHATUN"],["2150170","2152500181","4","ALIA KHATUN"],["2150171","2152500182","5","ANOPRIYA HALDER"],["2150172","2152500183","6","ARADHAYA GHOSH"],["2150173","2152500184","7","ARIF MALITHYA"],["2150174","2152500185","8","ARIYAN ANSARY"],["2150175","2152500186","9","ARJUMA KHATUN"],["2150176","2152500187","10","ASHIK IKBAL ANSARY"],["2150177","2152500188","11","ASMANIA KHATUN"],["2150178","2152500189","12","ASMINA KHATUN"],["2150179","2152500190","13","AYESHA SIDDIKA"],["2150180","2152500191","14","AZIZA KHATUN"],["2150181","2152500192","15","BANASHREE CHOWDH"],["2150182","2152500193","16","DILRUBA KHATUN"],["2150183","2152500194","17","DIN MOHAMMAD"],["2150184","2152500195","18","HALIM MANDAL"],["2150185","2152500196","19","HALIMA KHATUN"],["2150186","2152500198","21","HIRA KHATUN"],["2150187","2152500199","22","ISMAIL MONDAL"],["2150188","2152500200","23","JANNATON FERDOUS"],["2150189","2152500201","24","JEHAN MOBARAK ARKO"],["2150190","2152500202","25","JIBONNESHA KHATUN"],["2150191","2152500204","27","KEKA GHOSH"],["2150192","2152500205","28","KURSIA KHATUN"],["2150193","2152500206","29","MAHABUL ALAM MOND"],["2150194","2152500207","30","MAMONI KHATUN"],["2150195","2152500208","31","MEGHA KHATUN"],["2150196","2152500210","33","MIJANUR RAHAMAN SK"],["2150197","2152500211","34","MILON SK"],["2150198","2152500212","35","MITA SHARMA"],["2150199","2152500213","36","MOJIRA KHATUN"],["2150200","2152500214","37","MONIKA KHATUN"],["2150201","2152500215","38","MORJINA KHATUN"],["2150202","2152500216","39","MOTIUR RAHAMAN"],["2150203","2152500217","40","MOUSUMI KHATUN"],["2150204","2152500218","41","MOUSUMI KHATUN"],["2150205","2152500219","42","MUKLESONA PERVIN"],["2150206","2152500220","43","MUKLESUR RAHAMAN"],["2150207","2152500221","44","MUNJUR HOSSAIN MON"],["2150208","2152500222","45","MUSLIMA KHATUN"],["2150209","2152500223","46","NACHHRINA KHANAM"],["2150210","2152500224","47","NAJMA AKHTAR"],["2150211","2152500225","48","NAMITA HALDER"],["2150212","2152500226","49","NAMITA SAHA"],["2150213","2152500227","50","NAZIMA KHATUN"],["2150214","2152500228","51","NAZMA KHATUN"],["2150215","2152500229","52","NOSMIRA KHATUN"],["2150216","2152500230","53","QUEEN AKTAR BANU"],["2150217","2152500231","54","RABINA KHANAM"],["2150218","2152500232","55","RAHUL MONDAL"],["2150219","2152500233","56","RAJIB MONDAL"],["2150220","2152500234","57","RAJIB MONDAL"],["2150221","2152500235","58","RAJIBUL SEIKH"],["2150222","2152500236","59","REHENA PARVIN"],["2150223","2152500237","60","REHENA PERVIN"],["2150224","2152500238","61","REMIJA KHATUN"],["2150225","2152500239","62","RINA KHATUN"],["2150226","2152500240","63","RUBAINA SIDDEQUI"],["2150227","2152500241","64","RUMA KHATUN"],["2150228","2152500242","65","SABINA KHATUN"],["2150229","2152500243","66","SABNAJ KHATUN"],["2150230","2152500244","67","SABNAJ KHATUN"],["2150231","2152500245","68","SAFIKUL MONDAL"],["2150232","2152500246","69","SAHANAJ KHATUN"],["2150233","2152500247","70","SAHARA BISWAS"],["2150234","2152500248","71","SALEHIN ANSARI"],["2150235","2152500249","72","SALMA NAJNIN"],["2150236","2152500250","73","SAMIM KHAN"],["2150237","2152500251","74","SAMIMA KHATUN"],["2150238","2152500252","75","SAMIRUL ISLAM"],["2150239","2152500253","76","SANTANA KHATUN"],["2150240","2152500254","77","SAYED ANOWAR MOND"],["2150241","2152500255","78","SELINA KHATUN"],["2150242","2152500256","79","SIMA KHATUN"],["2150243","2152500257","80","SOHAL RANA"],["2150244","2152500258","81","SOHANA KHATUN"],["2150245","2152500259","82","SOHEL RANA SK"],["2150246","2152500260","83","SOMA KHATUN"],["2150247","2152500261","84","SOMA KHATUN"],["2150248","2152500262","85","SONALI DEY"],["2150249","2152500263","86","SOURAV MONDAL"],["2150250","2152500265","88","SRABANI KHATUN"],["2150251","2152500266","89","SUMANA KHATUN"],["2150252","2152500267","90","TAHARIMA KHATUN"],["2150253","2152500268","91","TANIYA SULTANA"],["2150254","2152500269","92","TANUJA KHATUN"],["2150255","2152500270","93","UMME SALMA"],["2150256","2152500271","94","USHUF ALI SK"],["2150257","2152500272","1","ABDUL ALIM"],["2150258","2152500273","2","ABDUL HAI"],["2150259","2152500274","3","AFSANA YASHMIN"],["2150260","2152500276","5","AKTARUL ISLAM"],["2150261","2152500277","6","AMINUL ISLAM"],["2150262","2152500278","7","BISTI CHOWDHURY"],["2150263","2152500279","8","DELOWAR SAHID MON"],["2150264","2152500280","9","EARIN RAJ"],["2150265","2152500281","10","HASINA KHATUN"],["2150266","2152500282","11","ISMATARA KHATUN"],["2150267","2152500283","12","JAIDUR RAHAMAN BISW"],["2150268","2152500284","13","JESMINA KHATUN"],["2150269","2152500285","14","JINIA ANSARY"],["2150270","2152500286","15","KAMIMA KHATUN"],["2150271","2152500287","16","KHALIDA YASMIN"],["2150272","2152500288","17","KOYELI KHATUN"],["2150273","2152500289","18","KOYESH MONDAL"],["2150274","2152500290","19","MAHAMUD HASAN"],["2150275","2152500291","20","MALA KHATUN"],["2150276","2152500292","21","MD AMANULLA ANSARY"],["2150277","2152500293","22","MEHEBUB ANSARI"],["2150278","2152500294","23","MEHERUNNESA KHATU"],["2150279","2152500295","24","MONIRUJJAMAN"],["2150280","2152500296","25","MORJINA KHATUN"],["2150281","2152500297","26","MOTA KABBIR SHAIKH"],["2150282","2152500298","27","MST MONIYARA KHATU"],["2150283","2152500299","28","MUKLESUR RAHAMAN"],["2150284","2152500300","29","NAJIDA PARVIN"],["2150285","2152500301","30","NASIRUDDIN ANSARY"],["2150286","2152500302","31","RAHAN HAQUE"],["2150287","2152500303","32","RAHUL SK"],["2150288","2152500304","33","RAJESH SK"],["2150289","2152500307","36","RAMIJ RAJA"],["2150290","2152500308","37","RASEL AKTER MONDAL"],["2150291","2152500309","38","RAUF ANSARY"],["2150292","2152500310","39","RIMPA KHATUN"],["2150293","2152500311","40","RIYA PARVIN"],["2150294","2152500312","41","ROHIMA KHATUN"],["2150295","2152500313","42","ROJA KHATUN"],["2150296","2152500314","43","ROKIA KHATUN"],["2150297","2152500315","44","SAFIKUL ISLAM"],["2150298","2152500316","45","SAHID ANOWAR SK"],["2150299","2152500317","46","SAIN MONDAL"],["2150300","2152500318","47","SAKIL ANSARI"],["2150301","2152500319","48","SAKIL HASAN MONDAL"],["2150302","2152500320","49","SAMIM MONDAL"],["2150303","2152500321","50","SAMIM SK"],["2150304","2152500322","51","SAMIMA AKTHAR"],["2150305","2152500323","52","SAMIUL SK"],["2150306","2152500324","53","SARFARAJ MONDAL"],["2150307","2152500325","54","SARMIN SULTANA"],["2150308","2152500326","55","SHREYA DAS"],["2150309","2152500327","56","SHREYA KARMAKAR"],["2150310","2152500328","57","SOHANA PERVIN"],["2150311","2152500329","58","SUBHANKAR SWARNAK"],["2150312","2152500330","59","SUMON MONDAL"],["2150313","2152500331","60","SUROJIT DAS"],["2150314","2152500332","61","SWAHAM MONDAL"],["2150315","2152500333","62","TANIYA SULTANA"],["2150316","2152500334","63","TOYEBA KHATUN"],["2150317","2152500335","64","UBAUNNESA BISWAS"],["2150318","2152500337","66","YASMINA ANSARY"],["2150319","2152500338","6","AKTARUJJAMAN"],["2150320","2152500339","7","SAIDUL MANDAL"],["2150321","2152500340","8","SANAULLA MONDAL"],["2150322","2152500341","45","SABANA KHATUN"],["2150323","2152500342","46","RAHIMA KHATUN"],["2150324","2152500343","47","REXONA KHATUN"],["2150325","2152500344","48","NAJMINA KHATUN"],["2150326","2152500345","49","SK SADI"],["2150327","2152500346","50","ABDUL ALIM SK"],["2150328","2152500347","67","AJIJA PARVIN"],["2150329","2152500348","68","MIM MONDAL"],["2150330","2152500349","69","KABRIYA KHATUN"],["2150331","2152500350","70","SAYON KUNDU"],["2150332","2152500351","71","ARIAN SK"],["2150333","2152500352","72","MAKSURA KHATUN"],["2150334","2152500353","73","KHOS MOHAMMAD ANS"],["2150335","2152500354","18","RUKSONA KHATUN"],["2150336","2152500355","19","MD IRFAN"],["2150337","2152500356","95","KHAIRUL HASAN"],["2150338","2152500357","96","MIJANUR ALAM"],["2150339","2152500358","97","SUBHASISH MONDAL"],["2150340","2152500359","98","TABAROK SK"],["2150341","2152500360","99","MIZAN SK"],["2150342","2152500361","100","HASINA KHATUN"],["2150343","2152500362","101","SABILA KHATUN"],["2150344","2152500363","7","NASRIN NAHAR KHATU"],["2150345","2152500364","27","SAKIL AHAMED"],["2150346","2152500365","65","SONIA KHATUN"],["2150347","2152500366","66","SOMA KHATUN"],["2150348","2152500367","67","YEASMIN KHATUN"],["2150349","2152500368","68","LABONI KHATUN"],["2150350","2152500369","69","NOWRIN RIJA"],["2150351","2152500370","70","TANVIR SHAIKH"],["2150352","Af3G5w","51","BASIRUL SK"],["2150353","ew0nAs","52","NAJMIN SULTANA"],["2150354","95aMxh","53","BULTI KHATUN"],["2150355","igpjAW","54","LUTFA KHATUN"],["2150356","v2qhzg","74","JUBAIR AL MAMUN"],["2150357","Gdz353","75","MAHAMUDA KHATUN"],["2150358","aAbk5e","76","SUMITA KHATUN"],["2150359","dbar37","77","PARVEZ AHAMED"],["2150360","yy1G90","102","FARUK AHAMMAD SK"],["2150361","mGits7","103","RAKESH MONDAL"],["2150362","667gvq","104","SANIA KHATUN ANSAR"],["2150363","mnesmy","28","AKKASH ALI SK"],["2150364","rGu50G","29","MEHEBUB KHAN"],["2150365","Wvc8q1","71","CHAND TARA"],["2150366","6jW7Mx","72","SIMRAN NAHAR KHATU"]
];

// Build lookup map
const DB = {};
RAW.forEach(([id,pw,roll,name]) => { DB[id] = {id,pw,roll,name}; });

const ADMIN = {id:"0001", pw:"Nt@347"};

// ── DATA ──────────────────────────────────────────────────────
const TEACHERS = [
  {dept:"Education",emoji:"📚",hod:"Dr. Piyali Patra",title:"Assistant Professor & HOD",staff:["Arun Kumar Bairagya – Asst. Prof.","Tapati Mondal – SACT","Munshi Mahammad Hossen – SACT"]},
  {dept:"Bengali",emoji:"🔤",hod:"Dr. Krishnendu Munsi",title:"Assistant Professor & HOD",staff:["Dr. Goutam Kumar Mandal – Asst. Prof.","Sona Mondal – Asst. Prof.","Ismail Sk – SACT","Jesmin Khatun – SACT"]},
  {dept:"English",emoji:"🇬🇧",hod:"Hemanta Kr. Ghosh",title:"Assistant Professor & HOD",staff:["Jesmin Mondal – Asst. Prof.","Luisa Parveen – SACT"]},
  {dept:"History",emoji:"📜",hod:"Dr. Munmun De",title:"Assistant Professor & HOD",staff:["Mostafa Sajid Khan – Asst. Prof.","Sabir Hossain Sk – SACT"]},
  {dept:"Political Science",emoji:"🏛",hod:"Jahiruddin Sk",title:"Assistant Professor & HOD",staff:["Samim Reza – SACT","Mithun Mondal – SACT"]},
  {dept:"Geography",emoji:"🌍",hod:"Manoranjan Mandal",title:"Assistant Professor & HOD",staff:["Saikat Kumar Nandi – SACT","Bappa Sk – SACT"]},
  {dept:"Sanskrit",emoji:"🕉",hod:"Riya Das",title:"SACT & Acting HOD",staff:["Papiya Mandal – SACT"]},
  {dept:"Env. Studies",emoji:"🌿",hod:"Mahamaya Ghosh",title:"Guest Faculty",staff:[]},
];

const PYQ = [
  {sub:"Geography",year:"2024",sem:"Sem I",paper:"CC-1: Physical Geography",qs:["What is the difference between weathering and erosion? Explain with examples.","Describe the formation of a river delta. Name any two major deltas of India.","What do you mean by plate tectonics? Explain its significance.","Write a note on the Himalayan mountain system.","Explain the concept of soil formation and its types found in West Bengal.","What is a watershed? Why is watershed management important?","Describe the climate of the Gangetic Plain with reference to seasons.","Write short notes on: (a) Monsoon (b) Westerly winds","What is biodiversity? Explain threats to biodiversity in India.","Describe the geographic features of Murshidabad district."]},
  {sub:"Geography",year:"2024",sem:"Sem I",paper:"AECC: Environmental Studies",qs:["Define ecology and ecosystem. What are the components of an ecosystem?","What is global warming? Discuss its effects on human life.","Explain the concept of sustainable development with examples.","What are renewable and non-renewable resources? Give examples.","Write a note on water pollution and its prevention.","What is the role of forest in maintaining ecological balance?","Define biodiversity hotspots. Name two hotspots in India.","Explain the term carbon footprint. How can we reduce it?","What are the causes of ozone layer depletion?","Write short notes on: (a) Acid rain (b) Soil erosion"]},
  {sub:"Bengali",year:"2024",sem:"Sem I",paper:"CC-1: History of Bengali Literature",qs:["বাংলা সাহিত্যের আদিযুগের বৈশিষ্ট্য আলোচনা করো।","চর্যাপদের সাহিত্যিক মূল্য নির্ণয় করো।","মধ্যযুগের বাংলা সাহিত্যে বৈষ্ণব পদাবলীর অবদান আলোচনা করো।","রবীন্দ্রনাথের কাব্য-প্রতিভার পরিচয় দাও।","আধুনিক বাংলা কবিতায় জীবনানন্দ দাশের অবদান বিশ্লেষণ করো।","বাংলা উপন্যাসের বিকাশধারা সংক্ষেপে আলোচনা করো।","মাইকেল মধুসূদন দত্তের মেঘনাদবধ কাব্যের বিষয়বস্তু লেখো।","রবীন্দ্রনাথের ছোটগল্পের বৈশিষ্ট্য উল্লেখ করো।","বাংলা নাটকের ইতিহাস সংক্ষেপে লেখো।","টীকা লেখো: (ক) মঙ্গলকাব্য (খ) পুথিসাহিত্য"]},
  {sub:"History",year:"2024",sem:"Sem I",paper:"CC-1: Ancient Indian History",qs:["Describe the social and economic life of the Indus Valley Civilization.","What were the main teachings of the Vedas? Discuss briefly.","Explain the causes of the decline of the Maurya Empire.","Write a note on the Gupta period as the Golden Age of Indian history.","Describe the religious policies of Ashoka and their impact.","What is the significance of the Arthashastra by Kautilya?","Describe the architecture of ancient India with examples.","Explain the role of trade and commerce in ancient India.","Write short notes on: (a) Harappan seals (b) Megasthenes","What were the main features of the Vedic social system?"]},
  {sub:"Political Science",year:"2024",sem:"Sem I",paper:"CC-1: Political Theory",qs:["Define political science. What is its scope and importance?","Explain the concept of sovereignty with its characteristics.","What is democracy? Distinguish between direct and indirect democracy.","Discuss the Marxist theory of the state.","What are Fundamental Rights? Explain their importance.","Describe the Directive Principles of State Policy.","What is federalism? Explain the federal features of the Indian Constitution.","Write a note on the separation of powers.","Explain the role of the Supreme Court of India.","Write short notes on: (a) Liberalism (b) Nationalism"]},
  {sub:"Education",year:"2024",sem:"Sem I",paper:"CC-1: Philosophical Foundations",qs:["What is education? Explain its aims in the modern context.","Discuss the educational philosophy of Rabindranath Tagore.","What is Pragmatism? Explain its impact on education.","Describe the contribution of John Dewey to modern education.","Explain the concept of Learning by Doing.","What is the role of the teacher according to Idealism?","Describe the Naturalistic philosophy of education with reference to Rousseau.","What are the characteristics of a good curriculum?","Explain the importance of Vocational Education.","Write short notes on: (a) Montessori Method (b) Basic Education"]},
  {sub:"English",year:"2024",sem:"Sem I",paper:"CC-1: British Literature",qs:["Write a critical note on Geoffrey Chaucer's contribution to English literature.","Describe the characteristics of the Renaissance period in English literature.","Explain the themes in Shakespeare's Hamlet.","What is the significance of Milton's Paradise Lost?","Write a note on the Romantic Age in English poetry.","Describe the contribution of William Wordsworth to Romantic poetry.","What are the main features of Victorian literature?","Write short notes on: (a) The Age of Pope (b) Metaphysical Poetry","Explain the contribution of Charles Dickens to the English novel.","What is stream-of-consciousness technique in fiction?"]},
  {sub:"Geography",year:"2023",sem:"Sem I",paper:"CC-1: Physical Geography",qs:["Define geomorphology. What are its branches?","Explain the rock cycle with a diagram.","What is an earthquake? Describe its types and effects.","Describe the drainage patterns found in India.","What are fold mountains? Give examples from India.","Explain the concept of vulcanicity. Name active volcanoes in India.","What is ocean current? Describe any two major ocean currents.","Write short notes on: (a) Plateau (b) River meander","Describe the formation of coastal landforms.","What is atmospheric pressure? How does it vary with altitude?"]},
  {sub:"Bengali",year:"2023",sem:"Sem I",paper:"CC-1: Bengali Literature",qs:["মধ্যযুগের বাংলা সাহিত্যের প্রধান বৈশিষ্ট্যগুলি আলোচনা করো।","বাংলা সাহিত্যে রামায়ণ ও মহাভারতের প্রভাব আলোচনা করো।","ঈশ্বরচন্দ্র বিদ্যাসাগরের সাহিত্যকর্ম আলোচনা করো।","বাংলা গদ্য সাহিত্যের বিকাশে রামমোহন রায়ের ভূমিকা লেখো।","রবীন্দ্রনাথের গীতাঞ্জলির বৈশিষ্ট্য আলোচনা করো।","বাংলা ছোটগল্পের উদ্ভব ও বিকাশ আলোচনা করো।","কাজী নজরুল ইসলামের কবিতার বৈশিষ্ট্য আলোচনা করো।","বাংলা প্রহসন সাহিত্যের বিকাশ আলোচনা করো।","মানিক বন্দ্যোপাধ্যায়ের উপন্যাসের বৈশিষ্ট্য লেখো।","টীকা লেখো: (ক) শ্রীকৃষ্ণকীর্তন (খ) লোককথা"]},
  {sub:"History",year:"2023",sem:"Sem I",paper:"CC-1: Indian History",qs:["What were the major features of the Harappan civilization?","Describe the Mahajanapadas and their political system.","What was the role of Buddhism in Indian history?","Explain the administrative system of the Maurya Empire.","Describe the cultural achievements of the Gupta period.","What are the main causes of the decline of the Delhi Sultanate?","Describe the land revenue system under Akbar.","What were the major causes of the revolt of 1857?","Write a note on the Indian National Congress.","Write short notes on: (a) Bhakti Movement (b) Sufism"]},
];

const NOTICES_INIT = [
  {id:1,title:"Semester I Internal Exam Schedule 2025-26",body:"Internal Assessment Examination: 15th–25th July 2025. Carry ID cards. No entry without ID.",date:"2025-06-10",imp:true},
  {id:2,title:"Aikyashree Scholarship 2025 – Apply Now",body:"Applications open. Last date: 30 September 2025. Submit forms at college office with all documents.",date:"2025-06-08",imp:true},
  {id:3,title:"Annual Sports Day – 20 July 2025",body:"Register at Physical Education Dept. All students encouraged to participate.",date:"2025-06-05",imp:false},
  {id:4,title:"New Books Added to Library",body:"New books added across all departments. Check catalogue at library counter.",date:"2025-06-01",imp:false},
  {id:5,title:"NAAC Peer Team Visit Preparation",body:"All departments prepare documentation. Meeting: 25 June 2025, 11 AM in Conference Hall.",date:"2025-05-28",imp:true},
];

const SCHOLARSHIPS = [
  {name:"WB Minority Scholarship",amt:"₹5,000–10,000/yr",who:"Muslim/Christian/Sikh students, income <₹2.5L",dl:"Oct–Nov",color:"#818cf8"},
  {name:"Kanyashree (K-2/P-2)",amt:"₹25,000 one-time",who:"Girl students 18+, income <₹1.2L",dl:"Aug–Sep",color:"#f472b6"},
  {name:"Aikyashree",amt:"₹7,000–12,000/yr",who:"Minority UG students, income <₹2L",dl:"Sep–Oct",color:"#60a5fa"},
  {name:"NSP (Central Govt)",amt:"₹10,000/yr",who:"Minority community, income <₹1L, 50%+",dl:"Oct 31",color:"#34d399"},
  {name:"Swami Vivekananda M-c-M",amt:"₹1,000/month",who:"All communities, 75%+ in HS, income <₹2.5L",dl:"Aug–Sep",color:"#fbbf24"},
  {name:"Post Matric SC/ST/OBC",amt:"₹5,000–15,000/yr",who:"SC/ST/OBC UG students",dl:"Oct–Nov",color:"#f87171"},
];

// ── HELPERS ───────────────────────────────────────────────────
const ini = n => (n||"?").split(" ").slice(0,2).map(w=>w[0]||"").join("").toUpperCase();
const hue = n => { const p=["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#14b8a6"]; let h=0; for(const c of(n||"A")) h=(h*31+c.charCodeAt(0))%p.length; return p[h]; };

const AI_SYS = `You are NAXAS — the AI assistant of Hazi A.K. Khan College (HAKKC), Hariharpara, Murshidabad, West Bengal.

Answer ALL questions: college info AND general knowledge (like Google/Wikipedia).

COLLEGE: Est. 8 Sep 2008 | NAAC B++ (till Mar 2029) | UGC 2(f)&12(B) | Univ. of Kalyani | ~1718 students
COURSES: Bengali, English, History, Political Science, Philosophy, Education, Geography, Sanskrit (B.A. Hons & General, 3 yrs, ₹2500/yr)
DEPARTMENTS HODs: Education-Dr.Piyali Patra | Bengali-Dr.Krishnendu Munsi | English-Hemanta Kr.Ghosh | History-Dr.Munmun De | Political Science-Jahiruddin Sk | Geography-Manoranjan Mandal | Sanskrit-Riya Das
SCHOLARSHIPS: WB Minority, Kanyashree, Aikyashree, NSP, Swami Vivekananda, SC/ST/OBC Post Matric
FACILITIES: Library, Labs, Auditorium, Cafeteria, Gymnasium, Medical Room, Hostel

Also answer: world geography, capitals, science, history, maths, what things look like, career advice, study tips, exam help.

Reply in Bengali or English based on user's language. Be warm, helpful, and clear. Use bullet points for lists.`;

// ── CSS ───────────────────────────────────────────────────────
const G = `
@keyframes glow{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}
@keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
@keyframes pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes shine{0%{left:-100%}100%{left:200%}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}
.ni:focus{border-color:#818cf8!important;box-shadow:0 0 0 3px rgba(129,140,248,.18)!important;outline:none!important}
.btn3d{position:relative;overflow:hidden;transition:all .18s}
.btn3d:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.1)}
.btn3d:active:not(:disabled){transform:translateY(1px)}
.btn3d::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transition:none;pointer-events:none}
.btn3d:hover::after{animation:shine .6s ease}
.card3d{transition:transform .2s,box-shadow .2s}
.card3d:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 12px 40px rgba(0,0,0,.4)!important}
.tab3d:hover{background:rgba(255,255,255,.08)!important}
select option{background:#0d1229}
textarea,input{font-family:inherit}
`;

// ── LOGIN ────────────────────────────────────────────────────
function Login({onLogin}) {
  const [mode, setMode] = useState("student");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function attempt() {
    setErr(""); setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (mode === "guest") { onLogin({role:"guest",name:"Guest",id:"GUEST"}); return; }
      if (mode === "admin") {
        if (id.trim() === ADMIN.id && pw === ADMIN.pw) { onLogin({role:"admin",name:"Administrator",id:id.trim()}); return; }
        setErr("Wrong Admin ID or Password");
      } else {
        const s = DB[id.trim()];
        if (s && s.pw === pw.trim()) { onLogin({...s, role:"student"}); return; }
        setErr("Incorrect Student ID or Password");
      }
    }, 500);
  }

  return (
    <div style={{minHeight:"100vh",background:"#030308",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'Inter','Segoe UI',sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{G}</style>
      {/* 3D bg orbs */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",perspective:800}}>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.18),transparent 65%)",top:"-10%",left:"-5%",animation:"glow 8s ease-in-out infinite",filter:"blur(2px)"}}/>
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.15),transparent 65%)",bottom:"0%",right:"-5%",animation:"glow 10s ease-in-out 3s infinite",filter:"blur(2px)"}}/>
        <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(236,72,153,.1),transparent 65%)",top:"50%",left:"5%",animation:"glow 7s ease-in-out 1.5s infinite",filter:"blur(2px)"}}/>
        {/* grid lines for 3D depth */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.04}} viewBox="0 0 400 800" preserveAspectRatio="none">
          {[0,40,80,120,160,200,240,280,320,360,400].map(x=><line key={x} x1={x} y1="0" x2={x} y2="800" stroke="#818cf8" strokeWidth="1"/>)}
          {[0,80,160,240,320,400,480,560,640,720,800].map(y=><line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#818cf8" strokeWidth="1"/>)}
        </svg>
      </div>

      <div style={{width:"100%",maxWidth:400,animation:"up .45s ease",position:"relative",zIndex:2}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:80,height:80,borderRadius:22,background:"linear-gradient(145deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:34,fontWeight:900,color:"#fff",letterSpacing:-1,
            boxShadow:"0 0 0 1px rgba(129,140,248,.3), 0 8px 32px rgba(99,102,241,.5), 0 2px 0 rgba(255,255,255,.15) inset, 0 -2px 0 rgba(0,0,0,.3) inset"}}>H</div>
          <div style={{fontSize:26,fontWeight:900,color:"#fff",letterSpacing:-.5,textShadow:"0 0 30px rgba(129,140,248,.5)"}}>HAKKC <span style={{background:"linear-gradient(90deg,#818cf8,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>NAXAS</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:5,letterSpacing:.5}}>Smart College Portal · Semester I · 2025–26</div>
        </div>

        {/* Card with 3D border effect */}
        <div style={{background:"rgba(255,255,255,.04)",backdropFilter:"blur(28px)",borderRadius:24,padding:26,
          boxShadow:"0 0 0 1px rgba(255,255,255,.08), 0 24px 64px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.1) inset"}}>

          {/* Mode tabs */}
          <div style={{display:"flex",gap:5,background:"rgba(0,0,0,.4)",borderRadius:14,padding:4,marginBottom:22}}>
            {[["student","🎓","Student"],["guest","👁","Guest"],["admin","⚙","Admin"]].map(([m,ic,lb])=>(
              <button key={m} className="tab3d btn3d" onClick={()=>{setMode(m);setErr("");}}
                style={{flex:1,padding:"8px 2px",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",
                  background:mode===m?"linear-gradient(145deg,#6366f1,#8b5cf6)":"transparent",
                  color:mode===m?"#fff":"rgba(255,255,255,.35)",
                  boxShadow:mode===m?"0 4px 14px rgba(99,102,241,.4), 0 1px 0 rgba(255,255,255,.15) inset":"none"}}>
                {ic} {lb}
              </button>
            ))}
          </div>

          {mode === "guest" ? (
            <div style={{textAlign:"center",padding:"12px 0 4px"}}>
              <div style={{fontSize:36,marginBottom:8}}>👁</div>
              <div style={{color:"rgba(255,255,255,.6)",fontSize:13,lineHeight:1.7,marginBottom:16}}>Browse notices, PYQs, faculty info and college details without logging in.</div>
              <button className="btn3d" onClick={attempt} style={{width:"100%",padding:"13px",borderRadius:14,border:"none",background:"linear-gradient(145deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 6px 20px rgba(99,102,241,.4), 0 1px 0 rgba(255,255,255,.2) inset, 0 -2px 0 rgba(0,0,0,.2) inset"}}>
                Continue as Guest →
              </button>
            </div>
          ) : (
            <>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:.9,textTransform:"uppercase",marginBottom:5}}>{mode==="admin"?"Admin ID":"Student ID"}</div>
              <input className="ni" value={id} onChange={e=>setId(e.target.value)} placeholder={mode==="admin"?"0001":"e.g. 2150001"}
                style={{display:"block",width:"100%",marginBottom:14,padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.07)",color:"#fff",fontSize:15,transition:"all .2s"}}/>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:.9,textTransform:"uppercase",marginBottom:5}}>Password</div>
              <div style={{position:"relative",marginBottom:6}}>
                <input className="ni" type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&attempt()} placeholder="Enter password"
                  style={{display:"block",width:"100%",padding:"12px 42px 12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.07)",color:"#fff",fontSize:15,transition:"all .2s"}}/>
                <button onClick={()=>setShowPw(v=>!v)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",fontSize:14,padding:2}}>{showPw?"🙈":"👁"}</button>
              </div>
              {err && <div style={{color:"#f87171",fontSize:12.5,margin:"5px 0 2px",display:"flex",alignItems:"center",gap:5}}>⚠ {err}</div>}
              <button className="btn3d" disabled={busy} onClick={attempt}
                style={{width:"100%",marginTop:16,padding:"13px",borderRadius:14,border:"none",background:"linear-gradient(145deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  boxShadow:"0 6px 20px rgba(99,102,241,.4), 0 1px 0 rgba(255,255,255,.2) inset, 0 -2px 0 rgba(0,0,0,.2) inset"}}>
                {busy?<span style={{width:18,height:18,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/>:"Sign In →"}
              </button>
            </>
          )}
          <p style={{color:"rgba(255,255,255,.18)",fontSize:11,textAlign:"center",margin:"14px 0 0",lineHeight:1.5}}>366 students · Hazi A.K. Khan College · Hariharpara, Murshidabad</p>
        </div>
      </div>
    </div>
  );
}

// ── AI CHAT ──────────────────────────────────────────────────
function AIChat({user}) {
  const [msgs, setMsgs] = useState([{role:"assistant",content:`নমস্কার${user.role!=="guest"?" "+user.name?.split(" ")[0]:""} 👋\n\nআমি **NAXAS AI** — HAKKC-এর স্মার্ট অ্যাসিস্ট্যান্ট!\n\nযেকোনো প্রশ্ন করুন:\n• College info & scholarships\n• PYQ & exam preparation tips\n• World capitals, science, maths\n• যেকোনো সাধারণ জ্ঞান 🌍`}]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,busy]);

  const QUICK = ["Geography Sem 1 important questions 2024","Scholarship eligibility for minority students","Capital of France?","What does a college library look like?","NAAC B++ grade meaning","Exam preparation tips"];

  async function send(t) {
    const txt = (t||input).trim();
    if(!txt||busy) return;
    setInput("");
    const next = [...msgs,{role:"user",content:txt}];
    setMsgs(next); setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:800,system:AI_SYS,messages:next.map(m=>({role:m.role,content:m.content}))})
      });
      const d = await res.json();
      const reply = d?.content?.[0]?.text || "Sorry, I could not get a response. Please try again.";
      setMsgs([...next,{role:"assistant",content:reply}]);
    } catch(e) {
      setMsgs([...next,{role:"assistant",content:"Connection error. Please check your internet and try again."}]);
    }
    setBusy(false);
  }

  function renderMsg(text) {
    return text.split("\n").map((line,i,arr)=>{
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return <span key={i}>{parts.map((p,j)=>j%2===1?<strong key={j}>{p}</strong>:p)}{i<arr.length-1&&<br/>}</span>;
    });
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,paddingBottom:4}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"flex-end",gap:8,justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"pop .25s ease"}}>
            {m.role==="assistant"&&(
              <div style={{width:30,height:30,borderRadius:10,background:"linear-gradient(145deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",flexShrink:0,boxShadow:"0 3px 10px rgba(99,102,241,.4), 0 1px 0 rgba(255,255,255,.2) inset"}}>N</div>
            )}
            <div style={{maxWidth:"78%",background:m.role==="user"?"linear-gradient(145deg,#6366f1,#8b5cf6)":"rgba(255,255,255,.06)",color:"#f1f5f9",
              borderRadius:m.role==="user"?"18px 4px 18px 18px":"4px 18px 18px 18px",
              padding:"10px 14px",fontSize:13.5,lineHeight:1.65,
              boxShadow:m.role==="user"?"0 4px 16px rgba(99,102,241,.35), 0 1px 0 rgba(255,255,255,.15) inset":"0 2px 8px rgba(0,0,0,.3)",
              border:m.role==="assistant"?"1px solid rgba(255,255,255,.07)":"none"}}>
              {renderMsg(m.content)}
            </div>
          </div>
        ))}
        {busy&&(
          <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
            <div style={{width:30,height:30,borderRadius:10,background:"linear-gradient(145deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",boxShadow:"0 3px 10px rgba(99,102,241,.4)"}}>N</div>
            <div style={{background:"rgba(255,255,255,.06)",borderRadius:"4px 18px 18px 18px",padding:"12px 16px",border:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#818cf8",display:"inline-block",animation:`dot 1.2s ease-in-out ${i*.2}s infinite`}}/>)}</div>
            </div>
          </div>
        )}
        {msgs.length===1&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>{QUICK.map((q,i)=><button key={i} className="btn3d" onClick={()=>send(q)} style={{padding:"6px 11px",borderRadius:18,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.65)",fontSize:12,cursor:"pointer"}}>{q}</button>)}</div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:8,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)"}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask NAXAS anything..." rows={1}
          style={{flex:1,padding:"11px 13px",borderRadius:13,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:14,resize:"none",outline:"none"}}/>
        <button className="btn3d" onClick={()=>send()} disabled={!input.trim()||busy}
          style={{width:44,height:44,borderRadius:13,border:"none",background:!input.trim()||busy?"rgba(255,255,255,.07)":"linear-gradient(145deg,#6366f1,#8b5cf6)",color:"#fff",cursor:!input.trim()||busy?"not-allowed":"pointer",fontSize:18,flexShrink:0,
            boxShadow:!input.trim()||busy?"none":"0 4px 14px rgba(99,102,241,.4)"}}>↑</button>
      </div>
    </div>
  );
}

// ── PYQ ─────────────────────────────────────────────────────
function PYQPage() {
  const [sub, setSub] = useState("All");
  const [yr, setYr] = useState("All");
  const [open, setOpen] = useState(null);
  const subs = ["All",...new Set(PYQ.map(p=>p.sub))];
  const yrs = ["All",...new Set(PYQ.map(p=>p.year))];
  const list = PYQ.filter(p=>(sub==="All"||p.sub===sub)&&(yr==="All"||p.year===yr));

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <select value={sub} onChange={e=>setSub(e.target.value)} style={{flex:1,padding:"9px 10px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:13,outline:"none"}}>
          {subs.map(s=><option key={s}>{s}</option>)}
        </select>
        <select value={yr} onChange={e=>setYr(e.target.value)} style={{flex:"0 0 90px",padding:"9px 8px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:13,outline:"none"}}>
          {yrs.map(y=><option key={y}>{y}</option>)}
        </select>
      </div>
      <div style={{color:"rgba(255,255,255,.3)",fontSize:11,marginBottom:8}}>{list.length} paper(s) · {list.reduce((a,p)=>a+p.qs.length,0)} questions</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {list.map((p,i)=>(
          <div key={i} className="card3d" style={{background:"rgba(255,255,255,.04)",borderRadius:14,border:"1px solid rgba(255,255,255,.07)",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"13px 15px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,textAlign:"left"}}>
              <div style={{flex:1}}>
                <div style={{color:"#e2e8f0",fontWeight:700,fontSize:13.5}}>{p.sub} — {p.paper}</div>
                <div style={{color:"rgba(255,255,255,.35)",fontSize:11.5,marginTop:3}}>{p.year} · {p.sem}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                <span style={{background:"rgba(99,102,241,.25)",color:"#818cf8",borderRadius:8,padding:"2px 8px",fontSize:10.5,fontWeight:700,boxShadow:"0 2px 6px rgba(99,102,241,.2)"}}>{p.qs.length}Q</span>
                <span style={{color:"#818cf8",fontSize:20,display:"inline-block",transition:"transform .2s",transform:open===i?"rotate(90deg)":"none"}}>›</span>
              </div>
            </button>
            {open===i&&(
              <div style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"10px 15px",animation:"pop .2s ease"}}>
                {p.qs.map((q,j)=>(
                  <div key={j} style={{display:"flex",gap:9,padding:"7px 0",borderBottom:j<p.qs.length-1?"1px solid rgba(255,255,255,.04)":"none"}}>
                    <span style={{color:"#6366f1",fontWeight:800,fontSize:12.5,minWidth:20,flexShrink:0,marginTop:2}}>{j+1}.</span>
                    <span style={{color:"rgba(255,255,255,.75)",fontSize:13,lineHeight:1.6}}>{q}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TEACHERS ────────────────────────────────────────────────
function FacultyPage() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {TEACHERS.map((d,i)=>(
        <div key={i} className="card3d" style={{background:"rgba(255,255,255,.04)",borderRadius:14,border:"1px solid rgba(255,255,255,.07)",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"13px 15px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
            <div style={{width:44,height:44,borderRadius:13,background:`linear-gradient(145deg,${hue(d.dept)},${hue(d.dept)}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:`0 4px 12px ${hue(d.dept)}40, 0 1px 0 rgba(255,255,255,.15) inset`}}>{d.emoji}</div>
            <div style={{flex:1}}>
              <div style={{color:"#e2e8f0",fontWeight:700,fontSize:14}}>{d.dept}</div>
              <div style={{color:"rgba(255,255,255,.4)",fontSize:12,marginTop:2}}>{d.hod}</div>
            </div>
            <span style={{color:"#818cf8",fontSize:20,display:"inline-block",transition:"transform .2s",transform:open===i?"rotate(90deg)":"none"}}>›</span>
          </button>
          {open===i&&(
            <div style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"12px 15px",animation:"pop .2s ease"}}>
              <div style={{background:`linear-gradient(145deg,${hue(d.dept)}22,${hue(d.dept)}10)`,borderRadius:10,padding:"10px 12px",marginBottom:10,border:`1px solid ${hue(d.dept)}33`}}>
                <div style={{color:hue(d.dept),fontSize:10.5,fontWeight:700,letterSpacing:.6,textTransform:"uppercase"}}>Head of Department</div>
                <div style={{color:"#e2e8f0",fontWeight:700,fontSize:14,marginTop:3}}>{d.hod}</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{d.title}</div>
              </div>
              {d.staff.map((m,j)=>(
                <div key={j} style={{padding:"6px 0",borderBottom:j<d.staff.length-1?"1px solid rgba(255,255,255,.04)":"none",color:"rgba(255,255,255,.65)",fontSize:12.5}}>• {m}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── NOTICES ─────────────────────────────────────────────────
function NoticesPage({notices}) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {notices.map((n,i)=>(
        <div key={n.id} className="card3d" style={{background:"rgba(255,255,255,.04)",borderRadius:14,border:`1px solid ${n.imp?"rgba(239,68,68,.2)":"rgba(255,255,255,.07)"}`,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 15px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
              <div style={{flex:1}}>
                {n.imp&&<span style={{background:"rgba(239,68,68,.2)",color:"#f87171",borderRadius:6,padding:"1px 7px",fontSize:9.5,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",marginRight:6,boxShadow:"0 2px 6px rgba(239,68,68,.2)"}}>Important</span>}
                <div style={{color:"#e2e8f0",fontWeight:700,fontSize:13.5,marginTop:n.imp?5:0,lineHeight:1.4}}>{n.title}</div>
                <div style={{color:"rgba(255,255,255,.3)",fontSize:11,marginTop:4}}>📅 {n.date}</div>
              </div>
              <span style={{color:"#818cf8",fontSize:20,display:"inline-block",transition:"transform .2s",transform:open===i?"rotate(90deg)":"none",flexShrink:0}}>›</span>
            </div>
          </button>
          {open===i&&<div style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"10px 15px",color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.7,animation:"pop .2s ease"}}>{n.body}</div>}
        </div>
      ))}
    </div>
  );
}

// ── SCHOLARSHIPS ─────────────────────────────────────────────
function ScholarPage() {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {SCHOLARSHIPS.map((s,i)=>(
        <div key={i} className="card3d" style={{background:"rgba(255,255,255,.04)",borderRadius:14,border:`1px solid ${s.color}22`,boxShadow:`0 4px 20px rgba(0,0,0,.3), 0 0 0 0 ${s.color}`,padding:15}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{color:"#e2e8f0",fontWeight:700,fontSize:13.5,flex:1,paddingRight:8}}>{s.name}</div>
            <div style={{color:s.color,fontWeight:900,fontSize:14,flexShrink:0,textShadow:`0 0 12px ${s.color}60`}}>{s.amt}</div>
          </div>
          <div style={{color:"rgba(255,255,255,.45)",fontSize:12,marginBottom:6}}>👤 {s.who}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{color:"rgba(255,255,255,.3)",fontSize:12}}>⏰ Deadline: {s.dl}</div>
            <span style={{background:`${s.color}22`,color:s.color,borderRadius:8,padding:"2px 9px",fontSize:11,fontWeight:700,border:`1px solid ${s.color}33`}}>Apply</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ADMIN PANEL ──────────────────────────────────────────────
function AdminPanel({notices, setNotices, pyqData, setPyqData}) {
  const [tab, setTab] = useState("students");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({title:"",body:"",imp:false});
  const [nq, setNq] = useState({sub:"",yr:"2024",sem:"Sem I",paper:"",question:""});
  const [toast, setToast] = useState("");
  const all = Object.values(DB);
  const filtered = q.length>1 ? all.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||s.id.includes(q)||s.roll.includes(q)) : all;

  function ok(msg){setToast(msg);setTimeout(()=>setToast(""),2500);}
  function addNotice(){if(!form.title||!form.body)return;setNotices([{id:Date.now(),date:new Date().toISOString().slice(0,10),...form},...notices]);setForm({title:"",body:"",imp:false});ok("Notice published!");}
  function delNotice(id){setNotices(notices.filter(n=>n.id!==id));}
  function addQ(){
    if(!nq.sub||!nq.paper||!nq.question)return;
    const existing=pyqData.find(p=>p.sub===nq.sub&&p.year===nq.yr&&p.paper===nq.paper);
    if(existing){setPyqData(pyqData.map(p=>p.sub===nq.sub&&p.year===nq.yr&&p.paper===nq.paper?{...p,qs:[...p.qs,nq.question]}:p));}
    else{setPyqData([...pyqData,{sub:nq.sub,year:nq.yr,sem:nq.sem,paper:nq.paper,qs:[nq.question]}]);}
    setNq({...nq,question:""});ok("Question added!");
  }

  const ATABS=[["students","👥","Students"],["notices","📢","Notices"],["pyq","📝","PYQ"]];
  const inp = {width:"100%",padding:"9px 12px",borderRadius:11,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:13,outline:"none",marginBottom:8,display:"block"};

  return (
    <div>
      {toast&&<div style={{position:"fixed",top:66,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(145deg,#22c55e,#16a34a)",color:"#fff",padding:"7px 18px",borderRadius:12,fontWeight:700,fontSize:13,zIndex:999,boxShadow:"0 6px 20px rgba(34,197,94,.4)",whiteSpace:"nowrap"}}>{toast} ✅</div>}

      <div style={{display:"flex",gap:5,marginBottom:14}}>
        {ATABS.map(([t,ic,lb])=>(
          <button key={t} onClick={()=>setTab(t)} className="btn3d" style={{flex:1,padding:"8px 4px",borderRadius:11,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:tab===t?"linear-gradient(145deg,#6366f1,#8b5cf6)":"rgba(255,255,255,.06)",color:tab===t?"#fff":"rgba(255,255,255,.4)",boxShadow:tab===t?"0 4px 14px rgba(99,102,241,.35)":"none"}}>
            {ic} {lb}
          </button>
        ))}
      </div>

      {tab==="students"&&(
        <div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${all.length} students...`} style={{...inp,marginBottom:8}}/>
          <div style={{color:"rgba(255,255,255,.3)",fontSize:11,marginBottom:8}}>{filtered.length} results</div>
          <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:"55vh",overflowY:"auto"}}>
            {filtered.slice(0,60).map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(255,255,255,.03)",borderRadius:11,padding:"8px 11px",border:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{width:34,height:34,borderRadius:10,background:hue(s.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",flexShrink:0,boxShadow:`0 3px 8px ${hue(s.name)}50`}}>{ini(s.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#e2e8f0",fontWeight:600,fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div>
                  <div style={{color:"rgba(255,255,255,.28)",fontSize:10.5}}>ID: {s.id} · Roll: {s.roll}</div>
                </div>
              </div>
            ))}
            {filtered.length>60&&<div style={{color:"rgba(255,255,255,.2)",fontSize:11,textAlign:"center",padding:6}}>+{filtered.length-60} more — search to narrow</div>}
          </div>
        </div>
      )}

      {tab==="notices"&&(
        <div>
          <div style={{background:"rgba(255,255,255,.04)",borderRadius:14,padding:14,border:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
            <div style={{color:"#e2e8f0",fontWeight:700,marginBottom:10,fontSize:13}}>📢 Publish New Notice</div>
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title..." style={inp}/>
            <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Body..." rows={3} style={{...inp,resize:"vertical"}}/>
            <label style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,.55)",fontSize:13,marginBottom:10,cursor:"pointer"}}>
              <input type="checkbox" checked={form.imp} onChange={e=>setForm({...form,imp:e.target.checked})}/> Mark Important
            </label>
            <button className="btn3d" onClick={addNotice} style={{width:"100%",padding:"10px",borderRadius:11,border:"none",background:"linear-gradient(145deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 4px 14px rgba(99,102,241,.3)"}}>Publish</button>
          </div>
          {notices.map((n,i)=>(
            <div key={n.id} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(255,255,255,.03)",borderRadius:11,padding:"9px 12px",border:"1px solid rgba(255,255,255,.05)",marginBottom:5}}>
              <div style={{flex:1}}>
                <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{n.title}</div>
                <div style={{color:"rgba(255,255,255,.28)",fontSize:10.5}}>📅 {n.date}{n.imp?" · 🔴":""}</div>
              </div>
              <button onClick={()=>delNotice(n.id)} style={{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.2)",color:"#f87171",padding:"4px 9px",borderRadius:8,cursor:"pointer",fontSize:12,flexShrink:0}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {tab==="pyq"&&(
        <div>
          <div style={{background:"rgba(255,255,255,.04)",borderRadius:14,padding:14,border:"1px solid rgba(255,255,255,.07)",marginBottom:12}}>
            <div style={{color:"#e2e8f0",fontWeight:700,marginBottom:10,fontSize:13}}>📝 Add Question</div>
            {[["sub","Subject"],["yr","Year"],["sem","Semester"],["paper","Paper Name"]].map(([k,ph])=>(
              <input key={k} value={nq[k]} onChange={e=>setNq({...nq,[k]:e.target.value})} placeholder={ph} style={inp}/>
            ))}
            <textarea value={nq.question} onChange={e=>setNq({...nq,question:e.target.value})} placeholder="Question text..." rows={3} style={{...inp,resize:"vertical"}}/>
            <button className="btn3d" onClick={addQ} style={{width:"100%",padding:"10px",borderRadius:11,border:"none",background:"linear-gradient(145deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 4px 14px rgba(99,102,241,.3)"}}>Add Question</button>
          </div>
          <div style={{color:"rgba(255,255,255,.35)",fontSize:12}}>{pyqData.reduce((a,p)=>a+p.qs.length,0)} total questions across {pyqData.length} papers</div>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [notices, setNotices] = useState(NOTICES_INIT);
  const [pyqData, setPyqData] = useState(PYQ);

  if (!user) return <Login onLogin={u=>{setUser(u);setTab("home");}}/>;

  const isAdmin = user.role === "admin";
  const isGuest = user.role === "guest";
  const color = hue(user.name||"A");

  const TABS = isAdmin
    ? [{id:"home",ic:"🏠",lb:"Home"},{id:"ai",ic:"🤖",lb:"NAXAS AI"},{id:"faculty",ic:"👨‍🏫",lb:"Faculty"},{id:"notices",ic:"📢",lb:"Notices"},{id:"admin",ic:"⚙",lb:"Admin"}]
    : isGuest
    ? [{id:"home",ic:"🏠",lb:"Home"},{id:"ai",ic:"🤖",lb:"AI Chat"},{id:"pyq",ic:"📝",lb:"PYQ"},{id:"faculty",ic:"👨‍🏫",lb:"Faculty"},{id:"notices",ic:"📢",lb:"Notices"},{id:"scholar",ic:"🏅",lb:"Scholar"}]
    : [{id:"home",ic:"🏠",lb:"Home"},{id:"ai",ic:"🤖",lb:"AI Chat"},{id:"pyq",ic:"📝",lb:"PYQ"},{id:"faculty",ic:"👨‍🏫",lb:"Faculty"},{id:"notices",ic:"📢",lb:"Notices"},{id:"scholar",ic:"🏅",lb:"Scholar"}];

  const PAGE_TITLE = {home:"Dashboard",ai:"NAXAS AI",pyq:"Previous Year Questions",faculty:"Faculty Directory",notices:"Notices & Updates",scholar:"Scholarships",admin:"Admin Panel"};

  return (
    <div style={{minHeight:"100vh",background:"#030308",fontFamily:"'Inter','Segoe UI',sans-serif",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",color:"#f1f5f9",position:"relative"}}>
      <style>{G}</style>

      {/* HEADER */}
      <div style={{background:"rgba(3,3,8,.9)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"10px 15px",position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",gap:10,
        boxShadow:"0 4px 20px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.04) inset"}}>
        <div style={{width:33,height:33,borderRadius:10,background:`linear-gradient(145deg,${color},${color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0,boxShadow:`0 3px 10px ${color}50, 0 1px 0 rgba(255,255,255,.2) inset`}}>{ini(user.name||"GU")}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:900,fontSize:14,letterSpacing:-.3}}>HAKKC <span style={{background:"linear-gradient(90deg,#818cf8,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>NAXAS</span></div>
          <div style={{color:"rgba(255,255,255,.3)",fontSize:10,marginTop:1}}>{isGuest?"Guest Mode":isAdmin?`Admin · ${user.id}`:`${user.name?.split(" ")[0]} · ID ${user.id}`}</div>
        </div>
        <button className="btn3d" onClick={()=>setUser(null)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.4)",padding:"5px 11px",borderRadius:9,cursor:"pointer",fontSize:11.5,fontWeight:600}}>Logout</button>
      </div>

      {/* PAGE HEADER */}
      <div style={{padding:"10px 15px 0"}}>
        <div style={{fontSize:10.5,color:"rgba(255,255,255,.25)",fontWeight:700,letterSpacing:.9,textTransform:"uppercase"}}>{PAGE_TITLE[tab]||tab}</div>
      </div>

      {/* CONTENT */}
      <div style={{flex:1,padding:"8px 15px 80px",overflowY:"auto",animation:"up .3s ease"}}>

        {/* HOME */}
        {tab==="home"&&(
          <div>
            {/* Hero card */}
            <div style={{background:"linear-gradient(145deg,rgba(99,102,241,.28),rgba(139,92,246,.18))",borderRadius:18,padding:18,marginBottom:14,border:"1px solid rgba(99,102,241,.2)",
              boxShadow:"0 8px 32px rgba(99,102,241,.2), 0 1px 0 rgba(255,255,255,.08) inset",position:"relative",overflow:"hidden"}}>
              {/* shine overlay */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)"}}/>
              <div style={{color:"rgba(255,255,255,.45)",fontSize:11,fontWeight:700,letterSpacing:.7,textTransform:"uppercase"}}>Welcome back</div>
              <div style={{color:"#fff",fontSize:21,fontWeight:900,marginTop:4,letterSpacing:-.5,textShadow:"0 2px 10px rgba(99,102,241,.4)"}}>{isGuest?"Guest 👁":(isAdmin?"Administrator ⚙":user.name?.split(" ").slice(0,2).join(" ")+" 👋")}</div>
              <div style={{color:"rgba(255,255,255,.4)",fontSize:12.5,marginTop:5}}>HAKKC NAXAS · Semester I · 2025–26</div>
            </div>

            {/* Stats grid */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {(isAdmin?[["👥","366","Students","Enrolled"],["⭐","B++","NAAC Grade","Valid Mar 2029"],["📚","8","Departments","Active"],["🏅","6","Scholarships","Available"]]
              :isGuest?[["📝","10","PYQ Papers","2023–2024"],["👨‍🏫","8","Departments","Faculty"],["📢","5","Notices","Active"],["🏅","6","Scholarships","Available"]]
              :[["🆔",user.id?.slice(-4),"Student ID","Sem I"],["📋",user.roll,"Roll No.","2025–26"],["📝","10","PYQ Papers","Available"],["🏅","6","Scholarships","Available"]]).map(([ic,v,t,s],i)=>(
                <div key={i} className="card3d" style={{background:"rgba(255,255,255,.04)",borderRadius:14,padding:"14px 13px",border:"1px solid rgba(255,255,255,.07)",boxShadow:"0 4px 16px rgba(0,0,0,.3), 0 1px 0 rgba(255,255,255,.06) inset"}}>
                  <span style={{fontSize:20}}>{ic}</span>
                  <div style={{fontSize:20,fontWeight:900,color:"#818cf8",margin:"5px 0 2px",textShadow:"0 0 20px rgba(129,140,248,.4)"}}>{v}</div>
                  <div style={{color:"#e2e8f0",fontSize:12,fontWeight:600}}>{t}</div>
                  <div style={{color:"rgba(255,255,255,.28)",fontSize:10.5}}>{s}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{background:"rgba(255,255,255,.04)",borderRadius:14,padding:14,border:"1px solid rgba(255,255,255,.07)",boxShadow:"0 4px 16px rgba(0,0,0,.3)"}}>
              <div style={{color:"rgba(255,255,255,.3)",fontSize:10,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",marginBottom:10}}>Quick Access</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["🤖","NAXAS AI","ai"],["📝","PYQ","pyq"],["👨‍🏫","Faculty","faculty"],["🏅","Scholarships","scholar"]].map(([ic,lb,t])=>(
                  <button key={t} className="btn3d" onClick={()=>setTab(t)}
                    style={{padding:"11px 8px",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.04)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                      boxShadow:"0 3px 12px rgba(0,0,0,.3), 0 1px 0 rgba(255,255,255,.06) inset"}}>
                    <span style={{fontSize:22}}>{ic}</span>
                    <span style={{color:"rgba(255,255,255,.6)",fontSize:12,fontWeight:700}}>{lb}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isAdmin&&!isGuest&&(
              <div style={{marginTop:12,background:"rgba(99,102,241,.08)",borderRadius:14,padding:13,border:"1px solid rgba(99,102,241,.15)"}}>
                <div style={{color:"#818cf8",fontWeight:700,fontSize:12.5,marginBottom:3}}>💡 From NAXAS</div>
                <div style={{color:"rgba(255,255,255,.45)",fontSize:12,lineHeight:1.65}}>Check <strong style={{color:"#fff"}}>PYQ</strong> for 2023–24 exam questions, or ask <strong style={{color:"#818cf8"}}>NAXAS AI</strong> for study help, world knowledge, or anything you're curious about!</div>
              </div>
            )}
          </div>
        )}

        {tab==="ai" && <AIChat user={user}/>}
        {tab==="pyq" && <PYQPage/>}
        {tab==="faculty" && <FacultyPage/>}
        {tab==="notices" && <NoticesPage notices={notices}/>}
        {tab==="scholar" && <ScholarPage/>}
        {tab==="admin" && <AdminPanel notices={notices} setNotices={setNotices} pyqData={pyqData} setPyqData={setPyqData}/>}

      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(3,3,8,.96)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",zIndex:100,
        boxShadow:"0 -4px 20px rgba(0,0,0,.5), 0 -1px 0 rgba(255,255,255,.04) inset"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 2px 10px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2.5,transition:"all .15s",WebkitTapHighlightColor:"transparent"}}>
            <span style={{fontSize:18,filter:tab===t.id?"none":"grayscale(1)",opacity:tab===t.id?1:.38,transition:"all .2s",filter:tab===t.id?"drop-shadow(0 0 6px #818cf8)":"grayscale(1)"}}>{t.ic}</span>
            <span style={{fontSize:9,fontWeight:700,color:tab===t.id?"#818cf8":"rgba(255,255,255,.22)",letterSpacing:.3,transition:"color .2s"}}>{t.lb}</span>
            {tab===t.id&&<div style={{width:16,height:2,borderRadius:2,background:"linear-gradient(90deg,#6366f1,#8b5cf6)",marginTop:.5,boxShadow:"0 0 8px #818cf8"}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
