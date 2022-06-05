import JSZip from 'jszip';
import saveAs from 'file-saver';

export default function Zipper({ fileName, data }) {
	function ollo() {
		var ZIP = new JSZip();
		ZIP.file('details.json', data);
		var img = ZIP.folder('00');
		ZIP.generateAsync({ type: 'blob' }).then(function (content) {
			// see FileSaver.js
			saveAs(content, fileName + '.zip');
		});
	}
	return (
		<div className=' w-screen flex text-center justify-center'>
			<button
				className='rounded bg-blue-700 text-white p-2 '
				onClick={ollo}>Download the zip</button>
		</div>
	);
}
