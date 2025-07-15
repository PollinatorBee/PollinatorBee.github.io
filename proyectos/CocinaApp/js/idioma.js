//IDIOMA.js
//SE CREA ESTE ARCHIVO PARA PONER EN LOS ARRAYS TODO LO QUE SE PUEDA CAMBIAR DE IDIOMA.

//creamos los arrays u objetos json para guardar los idiomas

const castellano = {
    //pagina index
    'raciones': 'raciones',
    'pedidos': 'pedidos',
    'resultados': 'resultados',
    'tiPedidos': 'Pedidos',
    'hisPedidos': 'Historico de pedidos.',
    'tiRaciones': 'Raciones',
    'contRaciones': 'Controla las Raciones.',
    'irPedidos': 'Ir a Pedidos',
    'irRaciones': 'Ir a Raciones',
    'reservados': '© 2024 CocinApp. Todos los derechos reservados.',
    'acerca': 'Acerca de',
    'contacto': 'Contacto',
    'politica': 'Política de privacidad',
    //pagina pedidos
    'mostrarHistorico': 'Historico de pedidos',
    'liPedidos': 'Lista de Pedidos',
    'tPedido': 'Pedido',
    'tUsusario': 'Usuario',
    'tDetalles': 'Detalles',
    'tComentarios': 'Comentarios',
    'tFechaP': 'F.Pedido',
    'tFechaR': 'F.Recogida',
    'tHora': 'Hora',
    'tpTotal': 'P.Total',
    'tEstado': 'Estado',
    //pagina histórico de pedidos
    'liPedidosh': 'Lista de Pedidos',
    'tPedidoh': 'Pedido',
    'tUsusarioh': 'Usuario',
    'tDetallesh': 'Detalles',
    'tComentariosh': 'Comentarios',
    'tFechaPh': 'F.Pedido',
    'tFechaRh': 'F.Recogida',
    'tpTotalh': 'P.Total',
    'tEstadoh': 'Estado',
    //pagina editar pedidos
    'edPedidos': 'Editar Pedido',
    'edPedidosEx': 'para seleccionar varias horas pulsar en el teclado Ctrl + mientras seleccionamos con el raton',
    'tHora': 'Hora Recoger',
    //pagina raciones
    'liRaciones': 'Lista de Raciones',
    'NRacion' : 'Nueva ración',
    'tNombre': 'Nombre',
    'tFoto': 'Foto',
    'tDescripcion': 'Descripción',
    'tAlergenos': 'Alergenos',
    'tPrecio': 'Precio',
    'tStock': 'Stock',
    'tMaximo': 'Maximo',
    'tAcciones': 'Acciones',
    //pagina raciones_new
    'cRacion': 'Crear Ración',
    //pagina raciones_edit
    'eRacion': 'Editar Ración',
    //pagina resultados
    'tiResultados': 'Resultados',
    //datos
    'dNombre': 'Nombre:',
    'dApellidos': 'Apellidos:',
    'dDepartamento': 'Departamento',
    'dVolver': 'Volver',
    //política de privacidad
    'pTit': 'Política de Privacidad',
    'pAct': 'Fecha de última actualización: 20-12-2023',
    'pEnt': 'Agradecemos su interés en CocinApp. La privacidad de nuestros usuarios es de suma importancia para nosotros. Esta Política de Privacidad describe cómo recopilamos, usamos, divulgamos y protegemos la información personal que recopilamos a través de nuestro sitio web CocinApp.com.',
    'pTitEnt1': '1. Información que Recopilamos',
    'pEnt1_1': 'Recopilamos información que usted nos proporciona directamente cuando utiliza nuestro Sitio. Esto puede incluir, entre otros:',
    'pEnt1_Li1': 'Información de contacto, como nombre, dirección de correo electrónico y número de teléfono.',
    'pEnt1_Li2': 'Preferencias de cocina y datos relacionados con sus pedidos.',
    'pEnt1_2': 'Además, podemos recopilar información automáticamente a través de tecnologías como cookies y registros del servidor cuando usted interactúa con nuestro Sitio.',
    'pTitEnt2': '2. Uso de la Información',
    'pEnt2_1': 'Utilizamos la información recopilada para:',
    'pEnt2_Li1': 'Procesar y gestionar pedidos de cocina.',
    'pEnt2_Li2': 'Personalizar y mejorar la experiencia del usuario.',
    'pEnt2_Li3': 'Enviar información sobre promociones, ofertas y actualizaciones relevantes.',
    'pEnt2_Li4': 'Garantizar la seguridad y protección de nuestros usuarios y del Sitio.',
    'pTitEnt3': '3. Divulgación de la Información',
    'pEnt3_1': 'No compartimos, vendemos ni alquilamos su información personal a terceros, excepto cuando sea necesario para procesar sus pedidos, cumplir con la ley o proteger nuestros derechos.',
    'pTitEnt4': '4. Seguridad de la Información',
    'pEnt4_1': 'Implementamos medidas de seguridad para proteger la información personal de accesos no autorizados, pérdidas, alteraciones y divulgaciones indebidas.',
    'pTitEnt5': '5. Enlaces a Otros Sitios Web',
    'pEnt5_1': 'Nuestro Sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de esos sitios y le recomendamos revisar sus políticas de privacidad.',
    'pTitEnt6': '6. Cambios en la Política de Privacidad',
    'pEnt6_1': 'Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le notificaremos sobre cambios significativos mediante un aviso en nuestro Sitio o a través de otros medios.',
    'pTitEnt7': '7. Consentimiento',
    'pEnt7_1': 'Al utilizar nuestro Sitio, usted acepta los términos de esta Política de Privacidad.',
    'pEnt7_2': 'Para preguntas o inquietudes sobre esta Política de Privacidad, contáctenos a ',
    'pEnt7_3': 'Gracias por confiar en CocinApp. ¡Disfrute de su experiencia culinaria con nosotros!',
    //acerca de nosotros
    "aTit": "Acerca de Nosotros",
    "aTitEnt1": "Nuestra Historia",
    "aEnt1_1": "Somos CocinApp, una empresa dedicada a brindar experiencias culinarias excepcionales desde 2024. Nos enorgullece ofrecer una amplia variedad de platillos deliciosos y servicios de alta calidad.",
    "aTitEnt2": "Nuestra Misión",
    "aEnt2_1": "Nuestra misión es ofrecer un servicio con altos estándares de calidad y satisfacción para el cliente. Nos esforzamos por ofrecer lo mejor de nosotros, proporcionando a nuestros clientes no solo comida deliciosa, sino también momentos inolvidables.",
    "aTitEnt3": "Equipo",
    "aEnt3_1": "Contamos con un equipo apasionado y talentoso que trabaja arduamente para garantizar la satisfacción de nuestros clientes. Con chefs expertos, personal amable y dedicado, estamos comprometidos a superar las expectativas en cada experiencia culinaria.",
    "aEnt3_2": "® 2024 CocinApp. Todos los derechos reservados.",
    //contacto
    'cTit': 'Contacto',
    'cTitEnt1': 'Contacta con nosotros'
};

const castellanoClass ={
    'preparar': 'Preparar Pedido',
    'recoger': 'Recoger Pedido',
    'recogido': 'Pedido Recogido'
};

const euskera = {
    'raciones': 'anoak',
    'pedidos': 'aginduak',
    'resultados': 'emaitzak',
    'tiPedidos': 'Aginduak',
    'hisPedidos': 'Eskaeren historia.',
    'tiRaciones': 'Errazioak',
    'contRaciones': 'Kontrolatu zatiak.',
    'irPedidos': 'Joan Eskaerak atalera',
    'irRaciones': 'Joan Rations-era',
    'reservados': '© 2024 CocinApp. Eskubide guztiak erreserbatuak.',
    'acerca': 'Buruz',
    'contacto': 'Kontaktua',
    'politica': 'Pribatutasun politika',
    //pagina pedidos
    'mostrarHistorico': 'Eskaeren historia',
    'liPedidos': 'Eskaera Zerrenda',
    'tPedido': 'Agindu',
    'tUsusario': 'Erabiltzailea',
    'tDetalles': 'Xehetasunak',
    'tComentarios': 'Iruzkinak',
    'tFechaP': 'Eskariaren data',
    'tFechaR': 'Jasotzearen data',
    'tHora': 'Hordua',
    'tpTotal': 'P.Guztira',
    'tEstado': 'Estatu',
    //pagina historico de pedidos
    'liPedidosh': 'Eskaera Zerrenda',
    'tPedidoh': 'Agindu',
    'tUsusarioh': 'Erabiltzailea',
    'tDetallesh': 'Xehetasunak',
    'tComentariosh': 'Iruzkinak',
    'tFechaPh': 'Eskariaren data',
    'tFechaRh': 'Jasotzearen data',
    'tpTotalh': 'P.Guztira',
    'tEstadoh': 'Estatu',
    //pagina editar pedidos
    'edPedidos': 'Editatu ordena',
    'edPedidosEx': 'Hainbat ordu hautatzeko, sakatu Ktrl + teklatuan saguarekin hautatzen duzun bitartean',
    'tHora': 'Hartzeko Ordua',
    //pagina raciones
    'liRaciones': 'Errazio Zerrenda',
    'NRacion' : 'Errazio berria',
    'tNombre': 'Izena',
    'tFoto': 'Argazkia',
    'tDescripcion': 'Deskribapena',
    'tAlergenos': 'Alergenoak',
    'tPrecio': 'Prezioa',
    'tStock': 'Stocka',
    'tMaximo': 'Maximoa',
    'tAcciones': 'Ekintzak',
    //pagina raciones_new
    'cRacion': 'Sortu Errazioa',
    //pagina raciones_edit
    'eRacion': 'Editatu Ration',
    //pagina resultados
    'tiResultados': 'Emaitzak',
    //datos
    'dNombre': 'Izena:',
    'dApellidos': 'Abizenak:',
    'dDepartamento': 'Sail',
    'dVolver': 'Itzuli',
    //politica
    "pTit": "Pribatutasun Politika",
    "pAct": "Azken eguneratze data: 2023-12-20",
    "pEnt": "CocinApp-en interesatu zaretenari eskerrak eman nahi dizkizuegu. Gure erabiltzaileen pribatutasuna oso garrantzitsua da guretzat. Pribatutasun Politika honek deskribatzen du nola biltzen, erabiltzen, argitaratzen eta babesten dugun informazio pertsonala, gure CocinApp.com webgunearen bidez biltzen dugun informazioa.",
    "pTitEnt1": "1. Biltzen dugun informazioa",
    "pEnt1_1": "Zuzenean ematen dizugun informazioa biltzen dugu gure Gunea erabiliz. Hau barne hartu dezake:",
    "pEnt1_Li1": "Harremanetarako informazioa, izen, posta helbide eta telefono zenbakia barne.",
    "pEnt1_Li2": "Sukaldeko gogokoenak eta zure eskaerarekin loturiko datuak.",
    "pEnt1_2": "Gainera, zure Gunearekin elkarreragin egiten duzunean cookie eta zerbitzari erregistroen bidez automatikoki biltzen dugun informazioa ere biltzen dugu.",
    "pTitEnt2": "2. Informazioa erabilera",
    "pEnt2_1": "Biltzen den informazioa erabilera honetarako erabiliko dugu:",
    "pEnt2_Li1": "Sukaldeko eskaerak prozesatu eta kudeatzeko.",
    "pEnt2_Li2": "Erabiltzailearen esperientzia pertsonalizatu eta hobetu.",
    "pEnt2_Li3": "Promozio, eskaintza eta eguneratze garrantzitsuak burutzeko informazioa bidaltzea.",
    "pEnt2_Li4": "Gure erabiltzaileen eta Gunearen segurtasuna bermatzea.",
    "pTitEnt3": "3. Informazioa partekatzea",
    "pEnt3_1": "Ez partekatzen, saltzen edo alokatzen dugu zure informazio pertsonala hirugarrenen artean, zure eskaerak prozesatzeko, legea betetzeko edo gure eskubideak babesteko beharrezkoa denean izan ezik.",
    "pTitEnt4": "4. Informazioaren segurtasuna",
    "pEnt4_1": "Segurtasun neurriak ezartzen ditugu sarrera baimenik gabeko, galera, aldaketak eta ezohiko argitarapenak konpontzeko.",
    "pTitEnt5": "5. Beste Webguneetara loturak",
    "pEnt5_1": "Gure Guneak hirugarrenen webguneetarako estekak izan ditzake. Ez gara erantzule horien pribatutasun praktiketan eta beren pribatutasun politikak berrikusi beharrean daude.",
    "pTitEnt6": "6. Pribatutasun Politikaren aldaketa",
    "pEnt6_1": "Aurreikusitako eskubidea dugu Pribatutasun Politika hau denbora batean eguneratu dezakegula. Aldaketa garrantzitsuak bertan behera emaneko edo beste bide batzuetatik jakinarazteko eskubidea gordetzen dugu.",
    "pTitEnt7": "7. Baimena",
    "pEnt7_1": "Gure Gunea erabiltzen duzunean, Pribatutasun Politikaren terminoak onartzen dituzu.",
    "pEnt7_2": "Pribatutasun Politikari buruzko galderak edo kezkak badituzu, jar zaitez gurekin harremanetan helbidean.",
    "pEnt7_3": "CocinApp-en sinetsi duzunagatik eskerrik asko. Zure sukaldaritza esperientzia gozatu!",
   //acerca de nosotros
   "aTit": "Guri Buruz",
    "aTitEnt1": "Gure Historia",
    "aEnt1_1": "CocinApp gara, 2024az geroztik aparteko sukaldaritza esperientziak eskaintzera dedikatzen den enpresa bat. Harro gaude plater goxo eta kalitate handiko zerbitzu ugari eskaintzeaz.",
    "aTitEnt2": "Gure Misioa",
    "aEnt2_1": "Gure eginkizuna kalitate estandar altuekin eta bezeroen gogobetetasuna duen zerbitzu bat eskaintzea da. Geure buruaren onena eskaintzen ahalegintzen gara, gure bezeroei janari goxoak ez ezik, momentu ahaztezinak ere eskainiz.",
    "aTitEnt3": "Taldea",
    "aEnt3_1": "Gure bezeroen gogobetetasuna bermatzeko gogor lan egiten duen talde sutsua eta talentua dugu. Sukaldari adituekin, langile atsegin eta dedikatuekin, jantokiko esperientzia guztietan itxaropenak gainditzeko konpromisoa hartzen dugu.",
    "aEnt3_2": "® 2024 CocinApp. Eskubide guztiak erreserbatuak.",
    //contacto
    'cTit': 'Harremanetan jarri',
    'cTitEnt1': 'Jarri gurekin harremanetan'
}

const euskeraClass = {
    'preparar': 'Eskaera prestatu',
    'recoger': 'Aukeratu eskaera',
    'recogido': 'Eskaera Jaso'
}

export{ castellano, euskera, castellanoClass, euskeraClass};