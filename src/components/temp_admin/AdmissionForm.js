import { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useAppContext } from '../../providers/ProviderAppContainer';
import { FileUpload } from 'primereact/fileupload';

export default function AdmissionForm() {

    const [formData, setFormData] = useState();

    const [imagePreview, setImagePreview] = useState(null);

    const { catelogue } = useAppContext();

    const handleSubmit = () => {
        const errors = {};

        // Validate each required field
        if (!formData.selectedProduct) {
            errors.selectedProduct = "Please select a product";
        }
        if (!formData.branch) {
            errors.branch = "Please select a branch";
        }
        if (!formData.fullName?.trim()) {
            errors.fullName = "Full name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (formData.paidFees == null || formData.paidFees <= 0) {
            errors.paidFees = "Paid fees must be a positive amount";
        }
        if (!formData.modeOfPayment) {
            errors.modeOfPayment = "Please select a payment mode";
        }
        if (formData.totalFees == null || formData.totalFees <= 0) {
            errors.totalFees = "Total fees must be a positive amount";
        }
        if (!formData.staffName?.trim()) {
            errors.staffName = "Staff name is required";
        }
        if (!formData.image) {
            errors.image = "Please upload a student image";
        }
        if (!formData.agree) {
            errors.agree = "You must agree to the terms and conditions";
        }

        if (Object.keys(errors).length > 0) {
            setFormData((prev) => ({ ...prev, errors }));
        } else {
            console.log("Form Data:", formData);

            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            const admissionData = new FormData();
            admissionData.append('product', formData.selectedProduct);
            admissionData.append('branch', formData.branch);
            admissionData.append('fullName', formData.fullName);
            admissionData.append('studentMobile', formData.studentMobile);
            admissionData.append('parentMobile', formData.parentMobile);
            admissionData.append('email', formData.email);
            admissionData.append('address', formData.address);
            admissionData.append('area', formData.area);
            admissionData.append('city', formData.city);
            admissionData.append('paidFees', formData.paidFees);
            admissionData.append('modeOfPayment', formData.modeOfPayment);
            admissionData.append('totalFees', formData.totalFees);
            admissionData.append('iCardNumber', formData.iCardNumber);
            admissionData.append('lastSchool', formData.lastSchool);
            admissionData.append('lastClass', formData.lastClass);
            admissionData.append('reference', formData.reference);
            admissionData.append('staffName', formData.staffName);
            admissionData.append('note', formData.note);
            admissionData.append('image', formData.image);
            console.log(admissionData);
            fetch('https://sahasinstitute.com/adminportal/mobileApis/admissionDetails.php', {
                method: 'POST',
                body: admissionData,
                mode: "cors",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    }

    // File Upload Handler
    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, image: null }));
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    // Extract product options for dropdown
    const productOptions = catelogue.products?.map(({ id, title }) => ({ name: title, code: id })) || [];

    const branchOptions = [
        { label: "Waghodiya Road", value: "Waghodiya Road" },
        { label: "Sangam / Karelibag", value: "Sangam / Karelibag" },
        { label: "Sayajiganj", value: "Sayajiganj" },
    ];

    const paymentOptions = [
        { label: "Cash", value: "Cash" },
        { label: "PayU", value: "PayU" },
        { label: "Net Banking", value: "Net Banking" },
        { label: "UPI", value: "UPI" },
        { label: "Cheque", value: "Cheque" },
    ];

    return (
        <div className="flex justify-content-center">
            <div className="w-12">
                <Card className="shadow-2" title="Admission Form">
                    {/* Admission For */}
                    <div className="col-12">
                        <label htmlFor="product" className="font-bold block mb-2">Admission For *</label>
                        <Dropdown
                            id="product"
                            value={formData?.selectedProduct}
                            options={productOptions}
                            optionLabel="name"
                            placeholder="Select a Product"
                            className="inputtext-sm w-full"
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, selectedProduct: e.value }))
                            }
                        />
                        {formData?.errors?.selectedProduct && <Message severity="error" text={formData.errors.selectedProduct} />}
                    </div>

                    {/* Branch */}
                    <div className="col-12">
                        <label className="block font-bold mb-2">Branch *</label>
                        <div className="flex flex-column gap-2">
                            {branchOptions.map((option) => (
                                <div key={option.value} className="flex align-items-center">
                                    <RadioButton
                                        inputId={option.value}
                                        name="branch"
                                        value={option.value}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, branch: e.value }))
                                        }
                                        checked={formData?.branch === option.value}
                                    />
                                    <label htmlFor={option.value} className="ml-2">{option.label}</label>
                                </div>
                            ))}
                        </div>
                        {formData?.errors?.branch && <Message severity="error" text={formData.errors.branch} />}
                    </div>

                    {/* Full Name */}
                    <div className="col-12">
                        <label htmlFor="fullName" className="block font-bold mb-2">Full Name *</label>
                        <InputText
                            id="fullName"
                            value={formData?.fullName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                            className={`w-full ${formData?.errors?.fullName ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.fullName && <Message severity="error" text={formData.errors.fullName} />}
                    </div>

                    {/* Student Mobile */}
                    <div className="col-12">
                        <label htmlFor="studentMobile" className="block font-bold mb-2">Student Mobile</label>
                        <InputNumber
                            id="studentMobile"
                            value={formData?.studentMobile}
                            onValueChange={(e) => setFormData((prev) => ({ ...prev, studentMobile: e.value }))}
                            className={`w-full ${formData?.errors?.studentMobile ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.studentMobile && <Message severity="error" text={formData.errors.studentMobile} />}
                    </div>

                    {/* Parent Mobile */}
                    <div className="col-12">
                        <label htmlFor="parentMobile" className="block font-bold mb-2">Parent Mobile</label>
                        <InputNumber
                            id="parentMobile"
                            value={formData?.parentMobile}
                            onValueChange={(e) => setFormData((prev) => ({ ...prev, parentMobile: e.value }))}
                            className={`w-full ${formData?.errors?.parentMobile ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.parentMobile && <Message severity="error" text={formData.errors.parentMobile} />}
                    </div>

                    {/* Email */}
                    <div className="col-12">
                        <label htmlFor="email" className="block font-bold mb-2">Email *</label>
                        <InputText
                            id="email"
                            value={formData?.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className={`w-full ${formData?.errors?.email ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.email && <Message severity="error" text={formData.errors.email} />}
                    </div>

                    {/* Address */}
                    <div className="col-12">
                        <label htmlFor="address" className="block font-bold mb-2">Address</label>
                        <InputText
                            id="address"
                            value={formData?.address}
                            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                            className={`w-full ${formData?.errors?.address ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.address && <Message severity="error" text={formData.errors.address} />}
                    </div>

                    {/* Area */}
                    <div className="col-12">
                        <label htmlFor="area" className="block font-bold mb-2">Area</label>
                        <InputText
                            id="area"
                            value={formData?.area}
                            onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                            className={`w-full ${formData?.errors?.area ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.area && <Message severity="error" text={formData.errors.area} />}
                    </div>

                    {/* City */}
                    <div className="col-12">
                        <label htmlFor="city" className="block font-bold mb-2">City</label>
                        <InputText
                            id="city"
                            value={formData?.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                            className={`w-full ${formData?.errors?.city ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.city && <Message severity="error" text={formData.errors.city} />}
                    </div>

                    {/* Paid Fees */}
                    <div className="col-12">
                        <label htmlFor="paidFees" className="block font-bold mb-2">Paid Fees *</label>
                        <InputNumber
                            id="paidFees"
                            value={formData?.paidFees}
                            onValueChange={(e) => setFormData((prev) => ({ ...prev, paidFees: e.value }))}
                            mode="currency"
                            currency="INR"
                            className={`w-full ${formData?.errors?.paidFees ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.paidFees && <Message severity="error" text={formData.errors.paidFees} />}
                    </div>

                    {/* Mode of Payment */}
                    <div className="col-12">
                        <label htmlFor="modeOfPayment" className="block font-bold mb-2">Mode of Payment *</label>
                        <Dropdown
                            id="modeOfPayment"
                            value={formData?.modeOfPayment}
                            onChange={(e) => setFormData((prev) => ({ ...prev, modeOfPayment: e.value }))}
                            options={paymentOptions}
                            placeholder="Select Mode of Payment"
                            className={`w-full ${formData?.errors?.modeOfPayment ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.modeOfPayment && <Message severity="error" text="Please select a mode of payment." />}
                    </div>

                    {/* Total Fees */}
                    <div className="col-12">
                        <label htmlFor="totalFees" className="block font-bold mb-2">Total Fees *</label>
                        <InputNumber
                            id="totalFees"
                            value={formData?.totalFees}
                            onValueChange={(e) => setFormData((prev) => ({ ...prev, totalFees: e.value }))}
                            mode="currency"
                            currency="INR"
                            className={`w-full ${formData?.errors?.totalFees ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.totalFees && <Message severity="error" text={formData.errors.totalFees} />}
                    </div>

                    {/* I-Card Number */}
                    <div className="col-12">
                        <label htmlFor="iCardNumber" className="block font-bold mb-2">I-Card Number</label>
                        <InputText
                            id="iCardNumber"
                            value={formData?.iCardNumber}
                            onChange={(e) => setFormData((prev) => ({ ...prev, iCardNumber: e.target.value }))}
                            className={`w-full ${formData?.errors?.iCardNumber ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.iCardNumber && <Message severity="error" text={formData.errors.iCardNumber} />}
                    </div>

                    {/* Last School Attended */}
                    <div className="col-12">
                        <label htmlFor="lastSchool" className="block font-bold mb-2">Last School Attended</label>
                        <InputText
                            id="lastSchool"
                            value={formData?.lastSchool}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastSchool: e.target.value }))}
                            className={`w-full ${formData?.errors?.lastSchool ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.lastSchool && <Message severity="error" text={formData.errors.lastSchool} />}
                    </div>

                    {/* Last Class Studied */}
                    <div className="col-12">
                        <label htmlFor="lastClass" className="block font-bold mb-2">Last Class Studied</label>
                        <InputText
                            id="lastClass"
                            value={formData?.lastClass}
                            onChange={(e) => setFormData((prev) => ({ ...prev, lastClass: e.target.value }))}
                            className={`w-full ${formData?.errors?.lastClass ? "p-invalid" : ""}`}

                        />
                        {formData?.errors?.lastClass && <Message severity="error" text={formData.errors.lastClass} />}
                    </div>

                    {/* Reference */}
                    <div className="col-12">
                        <label htmlFor="reference" className="block font-bold mb-2">Reference</label>
                        <InputText
                            id="reference"
                            value={formData?.reference}
                            onChange={(e) => setFormData((prev) => ({ ...prev, reference: e.target.value }))}
                            className={`w-full ${formData?.errors?.reference ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.reference && <Message severity="error" text={formData.errors.reference} />}
                    </div>

                    {/* Staff Name */}
                    <div className="col-12">
                        <label htmlFor="staffName" className="block font-bold mb-2">Staff Name *</label>
                        <InputText
                            id="staffName"
                            value={formData?.staffName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, staffName: e.target.value }))}
                            className={`w-full ${formData?.errors?.staffName ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.staffName && <Message severity="error" text={formData.errors.staffName} />}
                    </div>

                    {/* Additional Notes */}
                    <div className="col-12">
                        <label htmlFor="note" className="block font-bold mb-2">Additional Notes</label>
                        <InputText
                            id="note"
                            value={formData?.note}
                            onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                            className={`w-full ${formData?.errors?.note ? "p-invalid" : ""}`}
                        />
                        {formData?.errors?.note && <Message severity="error" text={formData.errors.note} />}
                    </div>

                    {/* Image Upload */}
                    <div className="col-12">
                        <label htmlFor="image" className="block font-bold mb-2">Upload Student Image *</label>
                        <FileUpload
                            key={imagePreview ? "has-image" : "no-image"}
                            mode="basic"
                            name="image"
                            accept="image/*"
                            maxFileSize={1000000}
                            auto
                            chooseLabel="Browse"
                            customUpload
                            uploadHandler={handleFileUpload}
                            className={formData?.errors?.image ? "p-invalid" : ""}
                        />
                        {imagePreview && (
                            <div className="mt-3 relative">
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="border-round-md border-1 surface-border w-full"
                                        style={{ maxWidth: '200px' }}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        className="absolute right-0 top-0 -mt-2 -mr-2 p-1 w-2rem h-2rem"
                                        rounded
                                        severity="danger"
                                        aria-label="Remove"
                                        onMouseDown={handleRemoveImage}
                                    />
                                </div>
                            </div>
                        )}
                        {formData?.errors?.image && <Message severity="error" text={formData.errors.image} />}
                    </div>


                    {/* Agreement Checkbox */}
                    <div className="col-12">
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="agree"
                                checked={formData?.agree}
                                onChange={(e) => setFormData((prev) => ({ ...prev, agree: e.checked }))}
                                className={formData?.errors?.agree ? "p-invalid" : ""}
                            />
                            <label htmlFor="agree" className="ml-2">I agree to the terms and conditions</label>
                        </div>
                        {formData?.errors?.agree && <Message severity="error" text={formData.errors.agree} />}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 flex justify-content-center mt-3">
                        <Button
                            type="submit"
                            label="Submit Form"
                            icon="pi pi-check"
                            className="p-button-xs p-button-primary"
                            onClick={handleSubmit}
                        />
                    </div>

                </Card>
            </div>
        </div>
    );
}
