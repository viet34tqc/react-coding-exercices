import { useId, useState } from 'react';

const widgets = ['Widget A', 'Widget B', 'Widget C'];

const SimpleDnD = () => {
	const [draggedWidgets, setDraggedWidget] = useState<string[]>([]);

	function handleDrag(e: React.DragEvent, text: string) {
		e.dataTransfer.setData('widget', text);
	}

	function handleDrop(e: React.DragEvent) {
		const text = e.dataTransfer.getData('widget');
		setDraggedWidget([...draggedWidgets, text]);
	}

	return (
		<div className="grid grid-cols-2 gap-10 items-center w-[960px] max-w-full">
			<div className="grid gap-4">
				{widgets.map((widget: string) => (
					<div
						className="grid place-items-center bg-green-300 p-5"
						draggable
						key={`drag-${widget}`}
						onDragStart={e => handleDrag(e, widget)}
					>
						{widget}
					</div>
				))}
			</div>
			<div
				className="grid content-start gap-3 border border-white border-dotted aspect-square"
				onDrop={handleDrop}
				onDragOver={e => e.preventDefault()}
			>
				{draggedWidgets.length > 0 &&
					draggedWidgets.map(widget => (
						<div
							className="grid place-items-center bg-green-300 p-5"
							key={`drop-${widget}`}
							onDragStart={e => handleDrag(e, widget)}
						>
							{widget}
						</div>
					))}
			</div>
		</div>
	);
};

export default SimpleDnD;
