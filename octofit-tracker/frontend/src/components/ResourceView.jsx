export default function ResourceView({ title, status, error, columns, rows }) {
  return (
    <section>
      <h2 className="h3 mb-3">{title}</h2>
      {status === 'loading' && <p className="text-secondary">Loading…</p>}
      {status === 'error' && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {status === 'ready' && rows.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found.</p>
      )}
      {status === 'ready' && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row._id ?? row.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
