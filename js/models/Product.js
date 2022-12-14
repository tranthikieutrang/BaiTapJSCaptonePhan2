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

const toggleErrorMessage = (selector, isShow) => {
  $(selector).toggleClass("d-none", !!isShow);
};

const validateForm = () => {
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const imgChangeColor = document.getElementById("HinhSP2").value;
  const desc = document.getElementById("MoTa").value;
  const backCamera = document.getElementById("backCamera").value;
  const frontCamera = document.getElementById("frontCamera").value;
  const type = document.getElementById("typeModel").value;

  toggleErrorMessage("#TenSP-err", name);
  toggleErrorMessage("#GiaSP-err", price);
  toggleErrorMessage("#HinhSP-err", img);
  toggleErrorMessage("#HinhSP2-err", imgChangeColor);
  toggleErrorMessage("#MoTa-err", desc);
  toggleErrorMessage("#backCamera-err", backCamera);
  toggleErrorMessage("#frontCamera-err", frontCamera);
  toggleErrorMessage("#typeModel-err", type);

  return [
    name,
    price,
    img,
    imgChangeColor,
    desc,
    backCamera,
    frontCamera,
    type,
  ].every(Boolean);
};

const getProduct = async () => {
  try {
    toggleLoading(true);
    const res = await axios.get(BaseAPI);
    toggleLoading(false);
    state.listProduct = res?.data;
    triggerUpdated();
  } catch (error) {
    console.log(error);
    toggleLoading(false);
  }
};

const addnewProduct = async () => {
  try {
    const isValid = validateForm();
    if (!isValid) return;

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
  } catch (error) {
    console.log(error);
    toggleLoading(false);

    new Notify({
      title: "Failed",
      text: "Add product failed",
      autoclose: true,
      autotimeout: 2000,
      status: "error",
    });
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
    console.log(error);
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

const editProduct = async () => {
  try {
    const isValid = validateForm();
    if (!isValid) return;

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
  } catch (error) {
    console.log(error);
    toggleLoading(false);

    new Notify({
      title: "Failed",
      text: "Edit product failed",
      autoclose: true,
      autotimeout: 2000,
      status: "error",
    });
  }
};
