this.workflowCockpit = workflowCockpit({
    init: _init,
    onSubmit: _saveData,
    onError: _rollback,
  })

function _init(data,info){
    const { initialVariables } = data.loadContext
    console.log('Variaveis iniciais', initialVariables)

    info.getUserData().then((user) => {
        console.log('Dados do usuário',user)
        document.getElementById('nomSol').setAttribute('value',user.fullname)
        document.getElementById('email').setAttribute('value', user.email)
    })
    .then(() => {
        info.getPlatformData().then((platformData) => {
            console.log('Dados da plataforma', platformData)
        })
    })

    console.log('dados',data)
    console.log('Nova Solicitação',info.isRequestNew())
    info.getInfoFromProcessVariables().then((data) => {
        if(!info.isRequestNew() && Array.isArray(data)){
            let map = new Map()
            let i
            for(i = 0; i < data.length ; i++){
                map.set(data[i].key, data[i].value)
            }

            console.log('Carregando Dados', map)
            const city = map.get('city')
            const neighborhood = map.get('neighborhood')
            const street = map.get("street")
            
            document.getElementById('city').setAttribute('value', city)
            document.getElementById('neighborhood').setAttribute('value', neighborhood)
            document.getElementById('street').setAttribute('value', street)
        }
    })
}

function _saveData(data,info){
    function isFormValid(){
        const isChecked = document.getElementById('check').checked
        return isChecked
    }

    if(!isFormValid()){
        alert('Você precisa aceitar os termos para prosseguir!')
        throw new Error('Os dados informados não são validos!')
    }

    let newData = {}

    newData.city = document.getElementById('city').value
    newData.neighborhood = document.getElementById('neighborhood').value
    newData.street = document.getElementById('street').value
    console.log('Dados gravados',newData)
    return {
        formData: newData
    }


}

function _rollback(){}

// (function (){
//     'use strict'

//     Array.prototype.slice.call(forms).forEach((form)=>{
//         form.addEventListener(
//             'submit',
//             function (event){
//                 if(!form.checkValidity()){
//                     event.preventDefault()
//                     event.stopPropagation()
//                 }

//                 form.classList.add('was-validated')
//             },
//             false
//         )
//     })
// })
