1. move all svg files to assets folder. Give them meaningful names and use them as React components.

2. in client.ts declare a class called ApiError that will extend Error class. It should have two fields: message: string and code: number. return ApiError from get and post functions in case of error.

3. create a usePagination hook to incapsulate all the necessary data to use pagination (e.g. page, setPage etc.)

4. add lazy loading for pages. Dont forget about Suspense.

5. move search input to separate section. it shouldn't be a part of ProductTable. It should work independent. Make sure to match screenshot.

6. convert SearchBar into Combobox that will product results that matches search query. You should split useProducts to two hooks. useProducts will use getProducts and useSearchProducts will use searchProducts. useSearchProducts will be used for Combobox.

7. add image, price, rating, quantity, sku to search results.

8. move back LogoutButton. It should be placed in top right corner after SearchBar.

9. Separate view and business logic inside SearchBar. Create a Combobox component that will only responsible for ui. Rename SearchBar to ProductsSearchBar. It will be products specific component that will contain business logic.

10. add empty state for Combobox. Move SearchIcon outside of Combobox. It should be passed as a prop.

11. use Sonner for toasts (bunx shadcn@latest add sonner). Rewrite current toast on ProductsPage using new approach.

12. once user clicks checkbox inside table header all the items on page should be checked.

13. Separate Modal component from AddProductModal. Modal should be responsible for ui, AddProductModal should be responsible for business logic.
