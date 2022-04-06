"use strict"

// Számontartja, hány darab 
let numberOfTeas = 0

/**
 * Inkrementálja a DOM-ban lévő "tea-formok" számát.
 */
function addNewTeaForm() {
  numberOfTeas++

  const baseTeaContainer = document.querySelector('#teaForms')

  // Ha nincs ilyen div, akkor megintcsak ne menjünk tovább.
  if (!baseTeaContainer) {
    return 
  }

  const baseRow = document.createElement('div') 
  baseRow.classList.add('row', 'mt-3')

  const formGroup = document.createElement('div')
  formGroup.classList.add('col-sm-12', 'col-md-6', 'mx-auto', 'p-2')


  baseRow.appendChild(formGroup)
  baseTeaContainer.appendChild(baseRow)
}

/**
 * Amikor már teljesen lerenderelődött a dom, akkor...
 */
document.addEventListener('DOMContentLoaded', () => {
  const newTeaBtn = document.querySelector('#newTeaBtn')

  numberOfTeas = 0
 
  // Ha valamiért nem lenne ilyen gomb, akkor egyszerűen ne folytassuk.
  if (!newTeaBtn) {
    return
  }

  // Feliratkozunk az eseményekelőre.
  newTeaBtn.addEventListener('click', () => {
    addNewTeaForm()
  })
})