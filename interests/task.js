function updateChildCheckbox(parentCheckbox) {
    const childCheckboxes = parentCheckbox.parentElement.parentElement.querySelectorAll('.interest__check')
    if(childCheckboxes) {
        childCheckboxes.forEach(childCheckbox  => {
            childCheckbox.checked = parentCheckbox.checked
            childCheckbox.indeterminate = false
        })
    }
}

function updateParentCheckbox(checkbox) {
    const parentInterest = checkbox.closest('.interests_active')
    if(parentInterest) {
        const childCheckboxes = parentInterest.querySelectorAll('.interest__check')
        const childCheckboxesCount = Array.from(childCheckboxes).filter(checkbox => checkbox.checked).length
        const parentCheckbox = parentInterest.parentElement.querySelector('.interest__check')
        if(childCheckboxesCount === 0) {
            parentCheckbox.checked = false
            parentCheckbox.indeterminate = false
        } else if (childCheckboxesCount === childCheckboxes.length) {
            parentCheckbox.checked = true
            parentCheckbox.indeterminate = false
        } else {
            parentCheckbox.checked = false;
            parentCheckbox.indeterminate = true
        }
        updateParentCheckbox(parentInterest.parentElement)
    }

}


const checkboxes = document.querySelectorAll('.interest__check')

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        updateChildCheckbox(checkbox)
        updateParentCheckbox(checkbox)
    })
})
