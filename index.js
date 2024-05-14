const rootDiv = document.querySelector(".root")

const home = ()=>{
    rootDiv.innerHTML=`<header><h1>Bienvenido al desafio tecnico para el puesto JR de ABSTI SA!</h1></header>
    <main>
        <div class="mainHome">
            <p>selecciona tu interes</p>
            <div class="option">
                <button id="viewApi">ver consumicion de datos</button>
                <button id="viewData">conocer mas sobre mi</button>
            </div>
        </div>
    </main>`;

    const viewApi = document.querySelector("#viewApi")
    viewApi.addEventListener("click", ()=>{
        componentViewApi()
    })

    const viewData = document.querySelector("#viewData")
    viewData.addEventListener("click", ()=>{
        componentViewData()
    })
}
home()

const componentViewApi = ()=>{
    rootDiv.innerHTML=`<header><h1>consumiendo API de <a href="https://openweathermap.org/">Open Weather</a></h1></header>
    <button id="back">back</button>
    <main>
        <div class="mainViewApi">
            <nav>
                <div class="divNav">
                    <input type="text" id="input" placeholder="ingrese ciudad">
                    <button id="search">buscar</button>
                </div>
                
            </nav>
            <p class="error"></p>
            <div class="cards">
                
            </div>
        </div>
    </main>`
    const back = document.querySelector("#back")
    back.addEventListener("click", ()=>{home()})
    const input = document.querySelector("#input")
const buttonSearch = document.querySelector("#search")
let city = ""
let cities = []
const cards = document.querySelector(".cards")
buttonSearch.addEventListener("click", ()=>{
    city = input.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&&units=metric&APPID=ed61896ce920ba513d59b6d211df16e7`)
  .then(response => {
    if (!response.ok) {
      console.log("ocurrio un error a obtener el ok de la api");
    }
    return response.json(); 
  })
  .then(data => {
      const error = document.querySelector(".error")
      let cityObj = {}
    switch (data.cod) {
        case "404"||404:
            error.innerHTML="ciudad no encontrada"
            break;
        case "400"||400:
            error.innerHTML="ingrese caracteres para la busqueda"
            break;
        default:
            error.innerHTML=""
             cityObj = {
                name: data.name,
                img: data.weather[0].icon,
                temp: data.main.temp,
                description: data.weather[0].description,
            }
            const findName = cities.find(city => city.name === data.name);
            if (findName) {
                error.innerHTML="ciudad ya esta en la lista de abajo"
                console.log("Ya existe una ciudad con este nombre en el array.");
            } else {
                cities.push(cityObj)
                updateCities()
                console.log("No se encontró una ciudad con este nombre en el array.");
            }
            break;
    }

  })
  .catch(error => {
    console.error("ocurrio un problema en la peticion", error);
  });
})

const updateCities=()=>{
    cards.innerHTML=""
    cities.reverse().map((city)=>{
        cards.innerHTML+=`<div class="card">
            <h2>${city.name}</h2>
            <img src="https://openweathermap.org/img/wn/${city.img}.png" alt="img de clima">
            <h2>${city.temp}°C</h2>
            <h3>${city.description}</h3>
        </div>`
    })
}

if (cities.length===0) {
    cards.innerHTML="Busca ciudades las que te interese ver su clima"
}
}

const componentViewData = ()=>{
    rootDiv.innerHTML=`<header><h1>Info</h1></header>
    <button id="back">back</button>
    <main>
        <div class="mainViewData">
            <main >
                <h3>Mi nombre es David Valdez Gramajo</h3>
                <br>
                <p>Esto fue un desafio tecnico consumiendo la api <a href="https://openweathermap.org/"> Open Weather</a> en modo gratuito, cual cuya informacion puede no ser exacta si hablamos en tiempo real / actual / en vivo.</p>
                <p>Sr Reclutador/a: como piden una SPA con js vainilla, me gustaria que vea un intento de portfolio que realice apenas unos meses cuando comence con la programacion. Cabe destacar que para seleccionar y ver una opcion NO se hace con el mouse si no moviendo el puntero que aparece en pantala con flechitas del teclado, ej: si quieres ver sobre mi, pulse las flechas de su teclado hasta que el puntero se ubique en dicha posicion y le abrira la opcion. El link es: <a href="https://davidvg29.github.io/Portfolio/">https://davidvg29.github.io/Portfolio/</a></p>
                <br>
                <p>Repositorio de este desafio:<a href="https://github.com/Davidvg29/entrevista-tecnica-JR-de-ABSTI-SA-">https://github.com/Davidvg29/entrevista-tecnica-JR-de-ABSTI-SA-</a></p>
                <br>
                <b>Actualmente tengo conocimiento en: </b>
                
                <ul><br>   
                    <li><b>Frontend:</b> Redux, React, JavaScript, HTML, CSS, Bootstrap, Talwind, DaisyUI</li>
                    <li><b>Backend:</b> Express, Node</li>
                    <li><b>Data Base:</b> SQL, Sequelize, mongoDB, PostgreSQL
                    </li>
                    <li><b>Skill:</b> RESTfull api, Jest, multer, cloudinary, Testing, Git, Ilustrator, Photoshop</li>
                </ul>
                <br>
                <h4>Portfolio actual: <a href="https://davidvaldezgramajo.vercel.app/">https://davidvaldezgramajo.vercel.app/</a></h4>
                <br><h4>github: <a href="https://github.com/Davidvg29">https://github.com/Davidvg29</a></h4>
                <br><h4>Linkedin: <a href="https://www.linkedin.com/in/davidvaldezgramajo/">https://www.linkedin.com/in/davidvaldezgramajo/</a></h4>
                <br>
                <p>
                    Constantemente busco superarme y sorprenderme de mi mismi, en el gym, en lo personal, en lo profesional, etc. Por eso busco retos donde eleve mis conocimiento. Me encantaria seguir superando los filtros de esta postulacion y poder llegar a formar parte del equipo. Voy a destacar que estoy al 100% para aprender habilidades nuevas para contribuir a largo plazo en proyectos de la empresa, con mucho mas que decir pero llego al fina y digo lo ultimo... Estoy disponible para cuaquier charla ya que quiero saber mas sobre la empresa y los proyectos que tengan en mente para poder dar informacion de como podria ayudar asi que espero con ansias su llamado proximo. <br> Saludos cordiales desde Tucuman, Argentina.
                </p>
            </main>
        </div>
    </main>`
    const back = document.querySelector("#back")
    back.addEventListener("click", ()=>{home()})
}




