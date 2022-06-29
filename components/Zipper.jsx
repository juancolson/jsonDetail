import JSZip from 'jszip';
import saveAs from 'file-saver';

export default function Zipper({ fileName, data, num }) {
	function ollo() {
		
		var ZIP = new JSZip();
		ZIP.file('details.json', data);
		
		ZIP.folder("Content");
		console.log(num)
	
		var dwn_Link = 'https://nhentai.net/g/' + num + '/download';
		window.open(dwn_Link, '_blank');
		ZIP.generateAsync({ type: 'blob' }).then(function (content) {
			// see FileSaver.js
			saveAs(content, fileName + '.zip');
		});

	}
	return (
		<div className='w-screen flex flex-col text-center justify-center'>
			<button
				className='rounded bg-blue-700 text-white p-2 '
				onClick={ollo}
			>
				Download the Content ({num})
			</button>
		</div>
	);
}
