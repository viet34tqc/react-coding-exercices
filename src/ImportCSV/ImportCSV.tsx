import { useState } from 'react';

const Table = ({ data }: { data: {}[] }) => {
	if (data?.length === 0) return null;
	const headerKeys = Object.keys(data[0]);

	return (
		<table>
			<thead>
				<tr>
					{headerKeys.map(th => (
						<th key={th}>{th}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{Object.values(row).map((td: any, index) => (
							<td key={td + index}>{td}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

const ImportCSV = () => {
	const [data, setData] = useState<{}[]>([]);
	const csvFileToArray = (string: string) => {
		const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
		const csvRows = string
			.slice(string.indexOf('\n') + 1)
			.split('\n')
			.filter(r => r);

		const dataRows = csvRows.map((csvRow: string) => {
			const values = csvRow.split(',');
			return csvHeader.reduce((dataRow, header, index) => {
				dataRow[header] = values[index].trim();
				return dataRow;
			}, {});
		});
		return dataRows;
	};

	const handleUpload = async () => {
		if (window.showOpenFilePicker === undefined) {
			const msg = 'Your browser does not allow to open local files.';
			throw Error(msg);
		}

		let handle: FileSystemFileHandle;

		try {
			const accept = { 'text/plain': ['.csv'] };
			const result = await window.showOpenFilePicker({
				excludeAcceptAllOption: false,
				multiple: false,
				types: [{ description: 'CSV', accept }],
			});
			handle = result[0];
		} catch (error: unknown) {
			// User clicks "Cancel" on the file picker
			if (error instanceof DOMException && error.code === error.ABORT_ERR)
				return null;
			throw error;
		}

		const file = await handle.getFile();
		const content = await file.text();
		setData(csvFileToArray(content));
	};

	return (
		<>
			<button onClick={handleUpload}>Import CSV</button>
			<Table data={data} />
		</>
	);
};

export default ImportCSV;
