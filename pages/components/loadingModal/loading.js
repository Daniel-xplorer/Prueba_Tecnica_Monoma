

const openLoading = () => {
    const loading = document.getElementById('loading');
    console.log(loading);
    loading.classList.add('loading_open');
};

const closeLoading = () => {
    const loading = document.getElementById('loading');
    loading.classList.remove('loading_open');
};

export { openLoading, closeLoading };