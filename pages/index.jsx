import { data } from 'autoprefixer';
import Zipper from 'components/Zipper';
import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
	const [file_title, setFiletitle] = useState('');
	const [file_data, setFiledata] = useState('');

	function submittedNum(e) {
		e.preventDefault();
		var num = 'https://nhentai.net/api/gallery/' + e.target.number.value;
		window.open(num, '_blank');
	}

	function submittedForm(e) {

		e.preventDefault();
		var input = e.target.data.value;

		var sample = JSON.parse(input);

		var response = {};

		response['title'] = sample.title.pretty;

		setFiletitle(sample.title.pretty);

		var mainInfo = sample.tags;

		var tagList = [];
		mainInfo.forEach((element) => {
			if (element.type == 'artist') {
				response['author'] = element.name;
			}

			if (element.type == 'tag') {
				tagList.push(element.name);
			}
			tagList.sort();
			response['genre'] = tagList;
		});

		response['status'] = 2;
		response[
			'description'
		] = `Full title: ${sample.title.english}\nJapanese title: ${sample.title.japanese}\nPages: ${sample.num_pages}\n `;

		document.getElementById('resp').value = JSON.stringify(
			response,
			null,
			4
		);

		setFiledata(JSON.stringify(response, null, 4));

		// }
	}

	function tryGet(e) {
		e.preventDefault()

		var nuke_code = e.target.nuke_code.value
		fetch('https://jsonify-nhentai.herokuapp.com/' + nuke_code).then(data => data.json()).then(resp => {
			document.getElementById('paste').value = JSON.stringify(
				resp,
				null,
				4
			);
		});
		
			
	}
	return (
		<div className='w-screen flex flex-col text-center justify-center'>
			<Head>
				<title>Tachiyomi - Local Manga Detail</title>
			</Head>
			<form onSubmit={tryGet} className='m-3 w-11/12'>
				<input
					type='number'
					name='nuke_code'
					className='border border-black w-full'
					placeholder='Enter Nuke Code to try fetch DATA'
					required
				/>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 text-white p-2 w-full'
				>
					Try
				</button>
			</form>

			<form onSubmit={submittedNum} className='m-3 w-11/12'>
				<input
					type='number'
					name='number'
					className='border border-black w-full'
					required
					placeholder='Enter Nhentai Gallery Number to open in new tab'
				/>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 text-white p-2 w-full'
				>
					GO
				</button>
			</form>
			<div className='m-3 w-11/12'>
				<button
					className='rounded-xl bg-blue-700 text-white p-2 w-full'
					onClick={() => {
						navigator.clipboard
							.readText()
							.then(
								(clipText) =>
									(document.getElementById('paste').value =
										clipText)
							);
					}}
				>
					PASTE
				</button>
			</div>
			<form onSubmit={submittedForm} className='m-3 w-11/12' id='lol'>
				<textarea
					name='data'
					id='paste'
					className='border border-black w-full h-60 min-h-[50%] p-2'
					required
					placeholder='Paste JSON data here'
				/>
				<button
					type='reset'
					className='rounded-xl bg-blue-700 w-full p-2 text-white'
				>
					Clear
				</button>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 w-full p-2 text-white  mt-2'
				>
					GO
				</button>
			</form>

			<div className='m-3 w-11/12'>
				<textarea
					id='resp'
					className='border border-black w-full h-60 min-h-[50%] p-2'
					required
					readOnly
				/>
			</div>
			<div className='m-3 w-11/12'>
				<Zipper fileName={file_title} data={file_data} />
			</div>
		</div>
	);
}

export default Home;
