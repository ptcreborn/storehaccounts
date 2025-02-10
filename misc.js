

function query(id) {
  return document.getElementById(id);
}

function disableElem(elem) {
    elem.style.opacity = '0.3';
    elem.style.pointerEvents = 'none';
    elem.disabled = true;
}

function enableElem(elem) {
    elem.style.opacity = '1';
    elem.style.pointerEvents = 'auto';
    elem.disabled = false;
}
