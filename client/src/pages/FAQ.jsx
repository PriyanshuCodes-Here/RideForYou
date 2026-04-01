function FAQ() {
  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">FAQs</h1>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">How does tracking work?</h3>
          <p className="text-gray-400">We use live GPS and map APIs.</p>
        </div>

        <div>
          <h3 className="font-semibold">Is it free?</h3>
          <p className="text-gray-400">Yes, completely free to use.</p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;