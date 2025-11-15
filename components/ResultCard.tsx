// components/ResultCard.tsx
export default function ResultCard({ result }: { result: any }) {
  if (result?.error) {
      return (
        <div className="mt-10 p-6 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 font-medium">{result.error}</p>
        </div>
      )
    }
  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">{result.template}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {(result.confidence * 100).toFixed(0)}% confidence
        </span>
      </div>
      <p className="text-gray-700 mb-5">{result.parsedConstraint}</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="text-sm font-mono overflow-x-auto">
          {JSON.stringify(result.parameters, null, 2)}
        </pre>
      </div>

      {/* SAFE CHECK FOR ALTERNATIVES */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="mt-5 pt-5 border-t">
          <p className="text-sm font-semibold text-gray-600 mb-2">Alternatives:</p>
          {result.alternatives.map((a: any, i: number) => (
            <p key={i} className="text-sm text-gray-500">• {a.template} ({(a.confidence * 100).toFixed(0)}%)</p>
          ))}
        </div>
      )}
    </div>
  )
}