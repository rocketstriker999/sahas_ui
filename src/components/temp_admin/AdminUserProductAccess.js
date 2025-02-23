import React, { useState, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { requestAPI } from "../../utils";

const AdminUserProductAccess = () => {
    const [email, setEmail] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [validityDate, setValidityDate] = useState(null);
    const [error, setError] = useState(false);
    const { catelogue } = useAppContext();

    // Extract product options for dropdown
    const productOptions = catelogue.products?.map(({ id, title }) => ({ name: title, code: id })) || [];

    // Email validation using useCallback (optimizes re-rendering)
    const validateEmail = useCallback((value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com)$/;
        setError(!regex.test(value));
        setEmail(value);
    }, []);

    // Reset all input fields
    const handleCancel = () => {
        setEmail("");
        setSelectedProduct(null);
        setValidityDate(null);
    };

    // API request to grant access
    const handleAddAccess = async () => {
        if (!email || !selectedProduct) {
            setError(true);
            return;
        }

        setError(false);

        await requestAPI({
            requestPath: "access/temp-addUserProductAccess",
            requestMethod: "POST",
            requestPostBody: {
                email,
                product_id: selectedProduct.code,
                validity: validityDate,
            },
            setLoading: (loading) => console.log("Loading:", loading), // Optional loading state handling
            onResponseReceieved: (data, status) => {
                if (status === 201) {
                    alert("Access granted successfully!");
                    handleCancel();
                } else {
                    alert(data.error || "Failed to grant access.");
                }
            },
            onRequestFailure: (error) => {
                console.error("Error:", error);
                alert("Something went wrong! Please try again.");
            },
        });
    };

    return (
        <div className="flex justify-content-center align-items-center p-4">
            <Card title="Add User Product Access">
                <div className="grid gap-2">
                    <div className="col-12">
                        <label htmlFor="email" className="block mb-2">
                            User Email
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            className={`w-full ${error ? "p-invalid" : ""}`}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="Enter user email"
                        />
                        {error && <Message severity="error" text="Please enter a valid email." className="mt-2" />}
                    </div>

                    <div className="col-12">
                        <label htmlFor="product" className="block mb-2">
                            Product
                        </label>
                        <Dropdown
                            id="product"
                            value={selectedProduct}
                            options={productOptions}
                            onChange={(e) => setSelectedProduct(e.value)}
                            optionLabel="name"
                            placeholder="Select a Product"
                            className="inputtext-sm w-full"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="validity" className="block mb-2">
                            Validity Date
                        </label>
                        <Calendar
                            id="validity"
                            value={validityDate}
                            onChange={(e) => {
                                const selectedDate = new Date(e.value);
                                const formated = `${selectedDate.getFullYear() + 1}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
                                setValidityDate(formated);
                            }}
                            showIcon
                            dateFormat="yy/mm/dd"
                            placeholder="Select validity date"
                            className="inputtext-sm w-full"
                        />
                    </div>

                    <div className="flex justify-content-end mt-4 gap-2">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text p-button-danger" onClick={handleCancel} />
                        <Button label="Add Access" icon="pi pi-check" className="p-button-success" onClick={handleAddAccess} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminUserProductAccess;
