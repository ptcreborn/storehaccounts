function query(id) {
  return document.getElementById(id);
}

function disableElem(elemID, text) {
    let elem = document.getElementById(elemID);
    elem.style.opacity = '0.7';
    elem.style.pointerEvents = 'none';
    elem.style.innerText = text;
}

function enableElem(elemID, text) {
    let elem = document.getElementById(elemID).style;
    elem.style.opacity = '1';
    elem.style.pointerEvents = 'auto';
    elem.style.innerText = text;
}
