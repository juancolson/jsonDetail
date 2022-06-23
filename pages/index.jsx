import { data } from 'autoprefixer';
import Zipper from 'components/Zipper';
import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
	const [file_title, setFiletitle] = useState('');
	const [file_data, setFiledata] = useState('');
	const [file_num, setFileNum] = useState('');


	function submittedNum(e) {
		e.preventDefault();
		setFileNum(e.target.number.value);

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
			<form onSubmit={tryGet} className='m-2 w-full'>
				<input
					type='number'
					name='nuke_code'
					className='border border-black w-full rounded-xl p-2'
					placeholder='Enter Nuke Code to try fetch DATA'
					required
				/>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 text-white p-2 my-1 w-full'
				>
					Try
				</button>
			</form>

			<form onSubmit={submittedNum} className='m-2 w-full'>
				<input
					type='number'
					name='number'
					className='border border-black w-full rounded-xl p-2'
					required
					placeholder='Enter Nhentai Gallery Number to open in new tab'
				/>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 my-1 text-white p-2 w-full'
				>
					GO
				</button>
			</form>
			<div className='m-2 w-full'>
				<button
					className='rounded-xl bg-blue-700 text-white p-2 my-1 w-full'
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
			<form onSubmit={submittedForm} className='m-2 w-[100% - 5px]' id='lol'>
				<textarea
					name='data'
					id='paste'
					className='rounded-xl border border-black w-full h-60 min-h-[50%] p-2'
					required
					placeholder='Paste JSON data here'
				/>
				<button
					type='reset'
					className='rounded-xl bg-blue-700 w-full p-2 my-1 text-white'
				>
					Clear
				</button>
				<button
					type='submit'
					className='rounded-xl bg-blue-700 w-full p-2 my-1 text-white'
				>
					GO
				</button>
			</form>

			<div className='m-2 w-full'>
				<textarea
					id='resp'
					className='rounded-xl p-2 border border-black w-full h-60 min-h-[50%] '
					placeholder='Formatted JSON Response will be here'
					required
					readOnly
				/>
			</div>
			<div className='m-2 w-full'>
				<Zipper fileName={file_title} data={file_data} num={file_num } />
			</div>
		</div>
	);
}

export default Home;
