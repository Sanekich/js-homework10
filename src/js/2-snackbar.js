import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const toastOptions = {
  position: 'topRight',
  pauseOnHover: false,
  close: false,
  icon: false,
};

const createNotificationPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const handleSubmit = e => {
  e.preventDefault();

  const { delay: delayInput, state: stateInput } = e.currentTarget.elements;
  const delay = Number(delayInput.value);
  const state = stateInput.value;

  createNotificationPromise(delay, state)
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        ...toastOptions,
      });
      console.log(`✅ Fulfilled promise in ${value}ms`);
    })
    .catch(value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        ...toastOptions,
      });
      console.log(`❌ Rejected promise in ${value}ms`);
    });
};

form.addEventListener('submit', handleSubmit);