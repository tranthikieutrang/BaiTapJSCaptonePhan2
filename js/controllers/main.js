const render = (list) => {
    const html = list.reduce(
        (result, curr, index) => (result += templateProduct({ ...curr, index })),
        ""
    );
    document.getElementById("tbodyProduct").innerHTML = html;
};
window.addEventListener("listProductUpdated", () => {
    render(state.listProduct);
});

const handleClickThem = () => {
    $("#myModal").modal("show");
    $("#btn-edit").addClass("d-none");
    $("#btn-add").removeClass("d-none");
};

$("#myModal").on("hidden.bs.modal", function (e) {
    document.getElementById("TenSP").value = "";
    document.getElementById("GiaSP").value = "";
    document.getElementById("HinhSP").value = "";
    document.getElementById("HinhSP2").value = "";
    document.getElementById("MoTa").value = "";
    document.getElementById("backCamera").value = "";
    document.getElementById("frontCamera").value = "";
    document.getElementById("typeModel").value = "";

    document.getElementById("TenSP-err").classList.add('d-none');
    document.getElementById("GiaSP-err").classList.add('d-none');
    document.getElementById("HinhSP-err").classList.add('d-none');
    document.getElementById("HinhSP2-err").classList.add('d-none');
    document.getElementById("MoTa-err").classList.add('d-none');
    document.getElementById("backCamera-err").classList.add('d-none');
    document.getElementById("frontCamera-err").classList.add('d-none');
    document.getElementById("typeModel-err").classList.add('d-none');
});


$('#inputTK').on('keyup', (evt) => {
    const search = evt.target.value.toLowerCase()
    const listProductSearch = state.listProduct.filter(product => {
        return Object.values(product)?.join(" ")?.toLowerCase().includes(search)
    })
    render(listProductSearch)
})

// get product when mounted
getProduct();
//Checkvalid
Validator({
    rules: [
        Validator.isRequired('#TenSP', 'Vui lòng nhập trường này'),
        Validator.isRequired('#GiaSP', 'Vui lòng nhập trường này'),
        Validator.isNumber('#GiaSP', 'Trường này phải là số'),
        Validator.isRequired('#MoTa', 'Vui lòng nhập trường này'),
        Validator.isRequired('#HinhSP', 'Vui lòng nhập trường này'),
        Validator.isRequired('#HinhSP2', 'Vui lòng nhập trường này'),
        Validator.isRequired('#backCamera', 'Vui lòng nhập trường này'),
        Validator.isRequired('#frontCamera', 'Vui lòng nhập trường này'),
        Validator.isRequired('#typeModel', 'Vui lòng nhập trường này'),
    ]
})
