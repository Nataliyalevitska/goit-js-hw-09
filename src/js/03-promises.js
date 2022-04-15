import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
};
const handleBtnSubmit = e => {
  e.preventDefault();

  const amount = +refs.inputAmount.value;
  const delay = +refs.inputDelay.value;
  const baseStep = +refs.inputStep.value;
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + baseStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay, error: `❌ Rejected promise ${position} in ${delay}ms` });
    }, delay);
  });
}

refs.form.addEventListener('submit', handleBtnSubmit);

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
