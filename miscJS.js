function query(id) {
  return document.getElementById(id);
}

function disableElem(elemID, text) {
    let elem = query(elemID);
    elem.opacity = '0.7';
    elem.pointerEvents = 'none';
    elem.innerText = text;
}

function enableElem(elemID, text) {
    let elem = query(elemID).style;
    elem.opacity = '1';
    elem.pointerEvents = 'auto';
    elem.innerText = text;
}
