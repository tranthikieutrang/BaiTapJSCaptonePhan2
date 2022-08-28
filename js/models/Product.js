const state = {
  listProduct: [],
  idProductEdit: "",
};

const triggerUpdated = () => {
  window.dispatchEvent(new Event("listProductUpdated"));
};

const templateProduct = ({
  name,
  desc,
  price,
  img,
  imgChangeColor,
  index,
  backCamera,
  frontCamera,
  type,
  id,
}) => {
  return `
  <tr>
    <th scope="row">${index + 1}</th>
    <td>${name}</td>
    <td>${price}</td>
    <td><img class="image-product" src="${img}" /></td>
    <td><img class="image-product" src="${imgChangeColor}" /></td>
    <td>${desc}</td>
    <td>${frontCamera}</td>
    <td>${backCamera}</td>
    <td>${type}</td>
    <td>
      <div class="wrap-action"> 
        <i class="fa-solid fa-pen-to-square" onclick="handleClickEdit('${id}')"></i>
        <i class="fa-solid fa-trash" onclick="removeProduct('${id}')"></i>
      </div>
    </td>
  </tr>
  `;
};

const getProduct = async () => {
  try {
    toggleLoading(true);
    const res = await axios.get(BaseAPI);
    toggleLoading(false);
    state.listProduct = res?.data;
    triggerUpdated();
  } catch (error) {
    toggleLoading(false);
  }
};

const removeProduct = async (idProduct) => {
  try {
    toggleLoading(true);
    const {
      data: { id },
    } = await axios({
      method: "DELETE",
      url: `${BaseAPI}/${idProduct}`,
    });
    toggleLoading(false);
    state.listProduct = state.listProduct.filter(
      (product) => product.id !== id
    );
    triggerUpdated();

    new Notify({
      title: "Success",
      text: "Remove product success",
      autoclose: true,
      autotimeout: 2000,
      status: "success",
    });
  } catch (error) {
    toggleLoading(false);

    new Notify({
      title: "Failed",
      text: "Remove product failed",
      autoclose: true,
      autotimeout: 2000,
      status: "error",
    });
  }
};

const handleClickEdit = (id) => {
  state.idProductEdit = id;
  const {
    name,
    price,
    img,
    imgChangeColor,
    desc,
    backCamera,
    frontCamera,
    type,
  } = state.listProduct.find((product) => product.id === id);
  $("#myModal").modal("show");
  $("#myModal").modal("show");
  $("#btn-edit").removeClass("d-none");
  $("#btn-add").addClass("d-none");
  document.getElementById("TenSP").value = name;
  document.getElementById("GiaSP").value = price;
  document.getElementById("HinhSP").value = img;
  document.getElementById("HinhSP2").value = imgChangeColor;
  document.getElementById("MoTa").value = desc;
  document.getElementById("backCamera").value = backCamera;
  document.getElementById("frontCamera").value = frontCamera;
  document.getElementById("typeModel").value = type;
};


function Validator(options) {
  var listRule = {}
  let btnAdd = document.getElementById("btn-add");
  //add btn
  btnAdd.onclick = async function (e) {
    try {
      var result = true;
      options.rules.forEach(function (rule) {
        var inputElement = document.querySelector(rule.selector);
        result &= Vadidate(inputElement, rule);
      }
      )
      if (result) {
        const name = document.getElementById("TenSP").value;
        const price = document.getElementById("GiaSP").value;
        const img = document.getElementById("HinhSP").value;
        const imgChangeColor = document.getElementById("HinhSP2").value;
        const desc = document.getElementById("MoTa").value;
        const backCamera = document.getElementById("backCamera").value;
        const frontCamera = document.getElementById("frontCamera").value;
        const type = document.getElementById("typeModel").value;
        toggleLoading(true);
        const { data } = await axios({
          method: "post",
          url: BaseAPI,
          data: {
            backCamera,
            frontCamera,
            desc,
            iconLogo: "",
            img,
            imgChangeColor,
            name,
            price,
            type,
          },
        });
        state.listProduct.push(data);
        triggerUpdated();
        $("#myModal").modal("hide");
        toggleLoading(false);

        new Notify({
          title: "Success",
          text: "Add product success",
          autoclose: true,
          autotimeout: 2000,
          status: "success",
        });
      }
    } catch (error) {
      toggleLoading(false);

      new Notify({
        title: "Failed",
        text: "Add product failed",
        autoclose: true,
        autotimeout: 2000,
        status: "error",
      });
    }
  }

  //Update BTN :

  let btnCapNhat = document.getElementById('btn-edit')
  btnCapNhat.addEventListener('click', async function (e) {
    try {
      var result = true;
      options.rules.forEach(function (rule) {
        var inputElement = document.querySelector(rule.selector);
        result &= Vadidate(inputElement, rule);
      });
      if (result) {
        const idProduct = state.idProductEdit;
        const name = document.getElementById("TenSP").value;
        const price = document.getElementById("GiaSP").value;
        const img = document.getElementById("HinhSP").value;
        const imgChangeColor = document.getElementById("HinhSP2").value;
        const desc = document.getElementById("MoTa").value;
        const backCamera = document.getElementById("backCamera").value;
        const frontCamera = document.getElementById("frontCamera").value;
        const type = document.getElementById("typeModel").value;
        toggleLoading(true);
        const { data } = await axios({
          method: "put",
          url: `${BaseAPI}/${idProduct}`,
          data: {
            backCamera,
            frontCamera,
            desc,
            iconLogo: "",
            img,
            imgChangeColor,
            name,
            price,
            type,
          },
        });
        state.listProduct = state.listProduct.map((product) =>
          product.id === data.id ? data : product
        );
        triggerUpdated();
        $("#myModal").modal("hide");
        toggleLoading(false);

        new Notify({
          title: "Success",
          text: "Edit product success",
          autoclose: true,
          autotimeout: 2000,
          status: "success",
        });
      }
    } catch (error) {
      toggleLoading(false);

      new Notify({
        title: "Failed",
        text: "Edit product failed",
        autoclose: true,
        autotimeout: 2000,
        status: "error",
      });
    }
  })


  options.rules.forEach(function (rule) {
    let inputElement = document.querySelector(rule.selector);
    //  
    if (Array.isArray(listRule[rule.selector])) {
      listRule[rule.selector].push(rule.test)
    } else {

      listRule[rule.selector] = [rule.test]
    }

    inputElement.onblur = function () {
      let results = true;
      results &= Vadidate(inputElement, rule);
    };

  })

  function Vadidate(inputElement, rule) {
    var isValid = true;
    var errorElement = inputElement.closest('.form-group').querySelector('.error-message');
    var errorMessage;
    var rules = listRule[rule.selector];
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) {
        break;
      }
    }

    if (errorMessage) {
      inputElement.closest('.form-group').classList.add('invalid')
      errorElement.innerHTML = errorMessage;
      return isValid = false;
    } else {
      inputElement.closest('.form-group').classList.remove('invalid')
      errorElement.innerHTML = '';
      return isValid
    }
  }

}
//Kiểm tra trường có nhập chưa
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message
    }
  }
}
