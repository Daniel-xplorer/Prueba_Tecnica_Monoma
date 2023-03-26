
export default function openAlertModal(title, message, callback) {
    const modal = document.getElementById('alert-modal');
    modal.querySelector('#modal-title').innerHTML = title;
    modal.querySelector('#modal-body').innerHTML = message;
    modal.classList.add('show');
    modal.querySelector('#modal-footer button').addEventListener('click', () => {
        modal.classList.remove('show');
    });
};