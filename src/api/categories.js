export async function getCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filter?category=&tag=`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
  
    return response.json();
  }
  