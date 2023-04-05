export default class Modal{
    render(){
        const form = document.createElement('form');
        form.classList.add(
        'w-50',
        'd-flex',
        'flex-column',
        'border',
        'border-primary',
        'rounded',
        'p-4',
        "position-absolute",
        "top-50",
        "start-50",
        "translate-middle",
        "bg-light"
        );
        form.innerHTML = `<div class="mb-3">
        <label class="form-label">Email address</label>
        <input type="email" class="form-control" required>
        </div>
        <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" required>
        </div>`
        const btnForm = document.createElement('button');
        btnForm.type = 'submit';
        btnForm.innerText = 'Увійти';
        btnForm.classList.add('btn','btn-primary');  
        const btnCancel = document.createElement('button');
        btnCancel.type = 'reset';
        btnCancel.innerHTML = 'Скасувати'
        btnCancel.classList.add('btn', 'btn-danger', 'mt-2')
        form.append(btnForm, btnCancel);
        btnCancel.addEventListener('click', ()=>{
            form.remove()
        })       
        return form;  
    };
}

