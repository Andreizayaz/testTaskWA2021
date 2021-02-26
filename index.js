'use strict'

const container = document.querySelector('.container');
const textFromInput = document.querySelector('.text-input');
const btnSave = document.querySelector('.btn-save');
const readOnlySwitchMode = document.querySelector('#readonlySwitchMode');
const tagList = document.querySelector('.tag-list');

let tagItemsList=[];

initTagList();

btnSave.addEventListener('click', addTag);
readOnlySwitchMode.addEventListener('click', switchReadonlyMode);
tagList.addEventListener('click', deleteTagItem)

function addTag() {
  const tagName = textFromInput.value;
  if (tagName.trim()) {
    tagList.insertAdjacentHTML('afterbegin', `<li class="tag-item"><p class="tag-text">${tagName}</p><button class="btn-delete"><img class="btn-delete-icon" src="images/delete.png" alt="delete"></button></li>`);
    textFromInput.value = '';
    tagItemsList.push(tagName);
    localStorage.setItem('tags', JSON.stringify(tagItemsList));
  }
  return;
}

function switchReadonlyMode() {
  btnSave.disabled = !btnSave.disabled;
}

function deleteTagItem(e) {
  if ((e.target.tagName === 'BUTTON'
  || e.target.closest('button')) && !readOnlySwitchMode.checked) {
    const tagItem = e.target.closest('li');
    tagItem.remove();
    tagItemsList.splice(tagItemsList.indexOf(tagItem.innerText), 1);
    localStorage.setItem('tags', JSON.stringify(tagItemsList));
  }
}

function initTagList() {
  tagItemsList = JSON.parse(localStorage.getItem('tags'));
  if (tagItemsList.length>0) {
    tagItemsList.forEach(item => tagList.insertAdjacentHTML('afterbegin', `<li class="tag-item"><p class="tag-text">${item}</p><button class="btn-delete"><img class="btn-delete-icon" src="images/delete.png" alt="delete"></button></li>`))
  } else {
    alert('There are not tags!');
  }
}