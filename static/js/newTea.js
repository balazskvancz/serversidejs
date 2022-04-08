"use strict"

const mockTeas = [
  {id: 1, name: 'Yiwu #1'},
  {id: 2, name: 'DaXueShan'},
  {id: 3, name: 'Milky OOlong'}
]

/**
 * Generáltat egy teljesen random azonosítót.
 * @param {string} prefix Milyen prefix-el adjon vissza id-t.
 * @returns {string} A legenerált id.
 */
function getRandomId(prefix) {
  const chars = Math.random().toString(36).slice(2, 11)

  return `${ prefix }${ new Date().getUTCMilliseconds() }_${ chars }`
}

/**
 * Inkrementálja a DOM-ban lévő "tea-formok" számát.
 */
const addNewTeaForm = () => {
  const baseTeaContainer = document.querySelector('#teaForms')

  // Ha nincs ilyen div, akkor megintcsak ne menjünk tovább.
  if (!baseTeaContainer) {
    return 
  }

  // Generáltatunk egy id-t a sor-nak.
  const rowId = getRandomId('id-')


  // NO JSX, NO PARTY :)

  // Létrehozzuk az alap row-t.
  const baseRow = document.createElement('div') 
  baseRow.id = rowId
  baseRow.classList.add('row', 'mt-3')

  // Két részből áll a row, baloldalt lesz a selection, jobboldalt pedig az adott sor törlése gomb.
  const formGroup = document.createElement('div')
  formGroup.classList.add('col-sm-10', 'p-2')

  // Egy kis label a selection felé.
  const label = document.createElement('label')
  label.classList.add('fw-bold', 'p-2')
  label.innerHTML = 'Tea kiválasztása'

  // Létrehozzuk a selection-t.
  const teaSelection = document.createElement('select')
  teaSelection.classList.add('form-select')

  // Megadjuk, hogy legyen valamilyen egyedi name-je.
  teaSelection.name = getRandomId('tea-')

  // Feltöltjük adatokkal.
  mockTeas.forEach((tea) => {
    const option = document.createElement('option')

    option.value     = tea.id
    option.innerText = tea.name

    teaSelection.appendChild(option)
  }) 

  const hline = document.createElement('hr')
  hline.classList.add('my-3')

  // Hozzáadjuk az előbb létrehozott HTMLElementeket a baseRow-hoz.
  formGroup.appendChild(label)
  formGroup.appendChild(teaSelection)

  // Elkészítjük a másik divet is.
  const buttonDiv = document.createElement('div')
  buttonDiv.classList.add('col-sm-2', 'p-2', 'd-flex', 'justify-content-center', 'align-items-end')

  // A gomb & annak az eseménykezelője.
  const bDel = document.createElement('button')
  bDel.classList.add('btn', 'shadow-none')
  bDel.addEventListener('click', () => {
    const row = document.querySelector(`#${rowId}`)

    // Ha nem létezik, ilyen, akkor ne tegyen semmit.
    if (!row) {
      return
    }

    // Egyébként pedig törölje az egész row-t a DOM-ból.
    row.remove()
  })
  bDel.innerHTML = '<i class="bi bi-trash"></i>'

  buttonDiv.appendChild(bDel)

  baseRow.appendChild(formGroup)
  baseRow.appendChild(buttonDiv)

  // Majd a már alapból DOM-ban lévő div-be belerakjuk
  // az újonnan létrehozott elemet.
  baseTeaContainer.appendChild(baseRow)
}

/**
 * Amikor már teljesen lerenderelődött a dom, akkor...
 */
document.addEventListener('DOMContentLoaded', () => {
  const newTeaBtn = document.querySelector('#newTeaBtn')

  // Ha valamiért nem lenne ilyen gomb, akkor egyszerűen ne folytassuk.
  if (!newTeaBtn) {
    return
  }

  // Feliratkozunk az eseményekelőre.
  newTeaBtn.addEventListener('click', addNewTeaForm)
})

