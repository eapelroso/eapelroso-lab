let currentScript = 0;
let scriptCount = 0;
const art = [
                "confetti", 
                "fire", 
                "rotators", 
                "blurry", 
                "city", 
                "metro", 
                "rotation", 
                "semitone", 
                "ledscreen", 
                "conway", 
                "motion-matrix",
                "balls-bouncing",
                "cthulhu",
                "rotation-solid",
                "crt"
            ];
const scripts = [];

let initScripts = () =>{	
    art.forEach(element => {					
        scripts.push(`scripts/art-${element}.js`);
    });											
        
    scriptCount = scripts.length;				
}

let removeCanvasListeners = () =>{				
    var canvas = document.getElementById('myCanvas');
    canvas.replaceWith(canvas.cloneNode(true));
}

let removePreviousScript = () =>{				
    var previousScript = document.getElementById("artScript");
    if (previousScript){
        previousScript.outerHTML = "";
        previousScript.remove();
    }
}

let setScriptIndexByURL = () =>{					
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let artItem = urlParams.get("art");					
    let artItemIndex = art.indexOf(artItem);
    if (artItemIndex >= 0){						
        let randomButton = document.getElementById("randomButton");
        randomButton.innerHTML = '🔄';
        currentScript = artItemIndex;
    } else {					
        randomScriptIndex();
    }
}

let increaseScriptIndex = () =>{				
    if (currentScript < scriptCount - 1)
        currentScript++;
    else
        currentScript = 0;
}

let decreaseScriptIndex = () =>{				
    if (currentScript > 0)
        currentScript--;
    else
        currentScript = scriptCount - 1;
}

let randomScriptIndex = () =>{	
    currentScript = Math.floor(Math.random() * scriptCount);
}

let setCurrentScript = () => {				
    var js = document.createElement("script");
    js.id = "artScript";
    js.src = scripts[currentScript];
    js.setAttribute("type", "text/javascript");
    js.setAttribute("async", true);

    document.body.appendChild(js); 
}

let loadScript = (getScriptIndexFunction) =>{
    removeCanvasListeners();
    removePreviousScript();
    getScriptIndexFunction;
    setCurrentScript();
}

let loadNextScript = () =>{
    loadScript(increaseScriptIndex());
}

let loadPreviousScript = () =>{
    loadScript(decreaseScriptIndex());
}

let loadRandomScript = () =>{
    loadScript(randomScriptIndex());
}

let loadScriptByUrl = () => {				
    loadScript(setScriptIndexByURL());
}

window.addEventListener('load', () => {
    initScripts();			

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('art')){
        loadScriptByUrl();
    } else {					
        loadRandomScript();
    }
});
