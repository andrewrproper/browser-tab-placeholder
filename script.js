
// This max is based on firefox mobile, with tabs in list display format.
const maxTitleWithDelimLength = 33; 
const endDelimPart = ' .';

// This factor is needed because title display characters are wider than just dots.
const endDelimPartFactor = 1.7; 

const titlePrefix = "|| ";
const titleSuffix = " ||";

setTitleTo("..."); // default

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const params = new Proxy(
  new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  }
);

function setTitleTo (title) {
  const titleDisplayLength = title.length + titlePrefix.length + titleSuffix.length;

  let endDelim = "";
  const lenDiff = maxTitleWithDelimLength - titleDisplayLength;
  if ( lenDiff > 0 ) {
    const repeatNum = Math.floor(lenDiff / endDelimPart.length * endDelimPartFactor);
    /*
    console.debug("length calc", {
      maxTitleWithDelimLength: maxTitleWithDelimLength,
      titleDisplayLength: titleDisplayLength, 
      lenDiff: lenDiff, 
      repeatNum: repeatNum
    });
    */
    if ( repeatNum > 0 ) endDelim = endDelimPart.repeat(repeatNum);
  }

  document.getElementById("title").innerHTML = title;

  const newDocTitle = titlePrefix + title + titleSuffix + " " + endDelim;
  document.title = newDocTitle;
}
let input = document.getElementById("set-title");
  
console.debug(params);
let title = params.t;
if ( title !== undefined && title !== null && title !== "" ) {
  //console.debug("found title from params: "+title);
  setTitleTo(title);
  input.value = title;
} else {
  console.debug("no title found from params");
}

input.addEventListener('keyup', function(event) {
  let title = this.value;
  if ( title !== undefined && title !== null) {
    //console.debug("found title from text input: "+title);
    setTitleTo(title || "...");


    let searchParams = new URLSearchParams(window.location.search);
    if ( title ) searchParams.set("t", title);
    else searchParams.delete("t");

    let newURL = new URL(window.location.href);
    newURL.search = searchParams;

    window.history.pushState({}, "", newURL);
  } else {
    console.debug("no title found from text input");
  }
});

input.focus();


let aboutButton = document.getElementById("about-button");
let aboutHTML = document.getElementById("about-html");

aboutButton.addEventListener('click', function(event) {
  // toggle between displayed and not displayed
  if ( aboutHTML.style.display == 'none' ) {
    aboutHTML.style.display = '';
  } else {
    aboutHTML.style.display = 'none';
  }
});
