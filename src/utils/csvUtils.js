export const convertToCSV = (data) => {
    const headers = ["Amount", "Category", "Date", "Description"];
    const rows = data.map((expense) => [
      expense.amount,
      expense.category,
      new Date(expense.date).toLocaleDateString(),
      expense.description,
    ]);
  
    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join(
      "\n"
    );
  
    return csvContent;
  };
  