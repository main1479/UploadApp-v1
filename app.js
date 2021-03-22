const input = document.querySelector('.input__upload');
const uploaded = document.querySelector('.uploaded');
// Data state
const state = {
	files: [],
	file: {},
};

const markup = function (files) {
	return files
		.map((file) => {
			return `
         <li>
            <div class="file__info">
               <h4 class="file__name">${file.name.slice(0, 10)}***.${file.ext}</h4>
               <span class="file__size">${file.size}kb</span>
            </div>
            <div class="file__status">
               <div class="icon__close" data-id="${file.id}">
                  <svg>
                     <use xlink:href="img/icons.svg#icon-close"></use>
                  </svg>
               </div>
               <img src="${file.url}" class="file__preview" alt="file__name" />
            </div>
         </li>
      `;
		})
		.join('');
};

//
input.addEventListener('change', function () {
	const file = this.files[0];

	if (file) {
		const reader = new FileReader();
		state.file = {
			name: file.name,
			id: new Date().getTime(),
			size: Math.round(file.size / 1024),
			ext: file.type.slice(file.type.indexOf('/') + 1),
		};
		reader.addEventListener('load', function () {
			state.file.url = this.result;
			state.files.push(state.file);
			uploaded.innerHTML = '';
			uploaded.insertAdjacentHTML('afterbegin', markup(state.files));
			localStorage.setItem('files', JSON.stringify(state.files));
			console.log(state.file);
		});
		reader.readAsDataURL(file);
	}
});

window.addEventListener('load', function () {
	const data = JSON.parse(localStorage.getItem('files'));
	if (!data) return;
	state.files = data;
	uploaded.innerHTML = '';
	uploaded.insertAdjacentHTML('afterbegin', markup(state.files));
});

uploaded.addEventListener('click', function (e) {
	const btn = e.target.closest('.icon__close');
	if (!btn) return;
	const id = +btn.dataset.id;
	const index = state.files.findIndex((file) => file.id === id);
	state.files.splice(index, 1);
	uploaded.innerHTML = '';
	uploaded.insertAdjacentHTML('afterbegin', markup(state.files));
	localStorage.setItem('files', JSON.stringify(state.files));
});



// rebigard 20mg
// auntacid plus tablate
