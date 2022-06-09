import JSZip from 'jszip';
import saveAs from 'file-saver';

export default function Zipper({ fileName, data }) {
	function ollo() {
		
		var ZIP = new JSZip();
		ZIP.file('details.json', data);
		var folderCount = document.getElementById('folderCount').value
		console.log(folderCount);
		for (let index = 0; index < folderCount; index++) {
			ZIP.folder(index.toString());
		}
		ZIP.generateAsync({ type: 'blob' }).then(function (content) {
			// see FileSaver.js
			saveAs(content, fileName + '.zip');
		});
	}
	return (
		<div className='w-screen flex flex-col text-center justify-center'>
			<div className='m-2'>
			<label htmlFor='folders'>Enter number of Folders</label>
			<input
				className='p-3 w-12 border border-black ml-1 rounded-xl'
				type='number'
				name='folders'
				id='folderCount'
				defaultValue={1}
			/>

			</div>
			<button
				className='rounded bg-blue-700 text-white p-2 '
				onClick={ollo}
			>
				Download the zip
			</button>
		</div>
	);
}
