export default async function Leer_Componente() {
	return (
		<div className="overflow-hidden border border-gray-200 rounded-lg">
			<table className="table-auto divide-y divide-gray-200 w-full">
				<thead className="bg-gray-50">
					<tr>
						<th scope="col">UUID</th>
						<th scope="col">ID</th>
						<th scope="col">TIPO</th>
						<th scope="col">CORREO</th>
						<th scope="col">ACCIONES</th>
					</tr>
				</thead>

				<tbody className="bg-white divide-y divide-gray-200"></tbody>
			</table>
		</div>
	);
}
