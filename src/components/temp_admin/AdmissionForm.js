import { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Message } from "primereact/message";
import { useAppContext } from '../../providers/ProviderAppContainer';

export default function AdmissionForm() {

    const [selectedProduct, setselectedProduct] = useState(null);
    const [branch, setBranch] = useState('');
    const [fullName, setFullName] = useState('');
    const [studentMobile, setStudentMobile] = useState('');
    const [parentMobile, setParentMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [paidFees, setPaidFees] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [totalFees, setTotalFees] = useState('');
    const [iCardNumber, setICardNumber] = useState('');
    const [lastSchool, setLastSchool] = useState('');
    const [lastClass, setLastClass] = useState('');
    const [reference, setReference] = useState('');
    const [staffName, setStaffName] = useState('');
    const [note, setNote] = useState('');
    const [agree, setAgree] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const { catelogue } = useAppContext();

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
    const validateForm = () => {
        const newErrors = {};
        if (!selectedProduct) newErrors.selectedProduct = 'Admission For is required';
        if (!branch) newErrors.branch = 'Branch is required';
        // if (!fullName) newErrors.fullName = 'Full Name is required';
        // if (!studentMobile) newErrors.studentMobile = 'Student Mobile Number is required';
        if (!email) newErrors.email = 'Email is required';
        if (!paidFees) newErrors.paidFees = 'Paid Fees is required';
        if (!totalFees) newErrors.totalFees = 'Total Fees is required';
        if (!modeOfPayment) newErrors.modeOfPayment = 'Mode of Payment is required';
        if (!staffName) newErrors.staffName = 'Staff Name is required';
        if (!agree) newErrors.agree = 'You must agree to the terms';
        //if (!image) newErrors.image = 'Student Image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form data
            console.log({
                selectedProduct,
                branch,
                fullName,
                studentMobile,
                parentMobile,
                email,
                address,
                area,
                city,
                paidFees,
                modeOfPayment,
                totalFees,
                iCardNumber,
                lastSchool,
                lastClass,
                reference,
                staffName,
                note,
                image
            });
        }
    };


    return (
        <div className="flex justify-content-center mt-4">
            <div className="w-11">
                <Card className="shadow-2" title="Admission Form">
                    <form onSubmit={handleSubmit} className="grid p-fluid gap-3">
                        {/* Admission For */}
                        <div className="col-12">
                            <label htmlFor="product" className="font-bold block mb-2">Admission For *</label>
                            <Dropdown
                                id="product"
                                value={selectedProduct}
                                options={productOptions}
                                onChange={(e) => setselectedProduct(e.value)}
                                optionLabel="name"
                                placeholder="Select a Product"
                                className="inputtext-sm w-full"
                            />
                            {errors.selectedProduct && <Message severity="error" text={errors.selectedProduct} />}
                        </div>

                        {/* Branch */}
                        <div className="col-12">
                            <label className="block font-bold mb-2">Branch *</label>
                            <div className="flex flex-column gap-2">
                                {branchOptions.map((option) => (
                                    <div key={option.value} className="flex align-items-center">
                                        <RadioButton inputId={option.value} name="branch" value={option.value} onChange={(e) => setBranch(e.value)} checked={branch === option.value} />
                                        <label htmlFor={option.value} className="ml-2">{option.label}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.branch && <Message severity="error" text={errors.branch} />}
                        </div>

                        {/* Full Name */}
                        <div className="col-12">
                            <label htmlFor="fullName" className="block font-bold mb-2">Full Name</label>
                            <InputText id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className={errors.fullName ? "p-invalid" : ""} />
                            {errors.fullName && <Message severity="error" text={errors.fullName} />}
                        </div>

                        {/* Student Mobile */}
                        <div className="col-12">
                            <label htmlFor="studentMobile" className="block font-bold mb-2">Student Mobile</label>
                            <InputNumber id="studentMobile" value={studentMobile} onValueChange={(e) => setStudentMobile(e.value)} className={errors.studentMobile ? "p-invalid" : ""} />
                            {errors.studentMobile && <Message severity="error" text={errors.studentMobile} />}
                        </div>

                        {/* Parent Mobile */}
                        <div className="col-12">
                            <label htmlFor="parentMobile" className="block font-bold mb-2">Parent Mobile</label>
                            <InputNumber id="parentMobile" value={parentMobile} onValueChange={(e) => setParentMobile(e.value)} className={errors.parentMobile ? "p-invalid" : ""} />
                            {errors.parentMobile && <Message severity="error" text={errors.parentMobile} />}
                        </div>

                        {/* Email */}
                        <div className="col-12">
                            <label htmlFor="email" className="block font-bold mb-2">Email *</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? "p-invalid" : ""} />
                            {errors.email && <Message severity="error" text={errors.email} />}
                        </div>

                        {/* Address */}
                        <div className="col-12">
                            <label htmlFor="address" className="block font-bold mb-2">Address</label>
                            <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)} className={errors.address ? "p-invalid" : ""} />
                            {errors.address && <Message severity="error" text={errors.address} />}
                        </div>

                        {/* Area */}
                        <div className="col-12">
                            <label htmlFor="area" className="block font-bold mb-2">Area</label>
                            <InputText
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className={errors.area ? "p-invalid" : ""}
                            />
                            {errors.area && <Message severity="error" text={errors.area} />}
                        </div>

                        {/* City */}
                        <div className="col-12">
                            <label htmlFor="city" className="block font-bold mb-2">City</label>
                            <InputText
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={errors.city ? "p-invalid" : ""}
                            />
                            {errors.city && <Message severity="error" text={errors.city} />}
                        </div>

                        {/* PaidFees */}
                        <div className="col-12">
                            <label htmlFor="paidFees" className="block font-bold mb-2">Paid Fees *</label>
                            <InputNumber
                                id="paidFees"
                                value={paidFees}
                                onValueChange={(e) => setPaidFees(e.value)}
                                mode="currency"
                                currency="INR"
                                className={errors.area ? "p-invalid" : ""}
                            />
                            {errors.paidFees && <Message severity="error" text={errors.paidFees} />}
                        </div>

                        {/* ModeOfPayment */}
                        <div className="col-12">
                            <label htmlFor="modeOfPayment" className="block font-bold mb-2">Mode of Payment *</label>
                            <Dropdown
                                id="modeOfPayment"
                                value={modeOfPayment}
                                options={paymentOptions}
                                onChange={(e) => setModeOfPayment(e.value)}
                                placeholder="Select Mode of Payment"
                                className={`w-full ${errors.modeOfPayment ? "p-invalid" : ""}`}
                            />
                            {errors.modeOfPayment && <Message severity="error" text="Please select a mode of payment." />}
                        </div>

                        {/* TotalFees */}
                        <div className="col-12">
                            <label htmlFor="totalFees" className="block font-bold mb-2">Total Fees *</label>
                            <InputNumber
                                id="totalFees"
                                value={totalFees}
                                onValueChange={(e) => setTotalFees(e.value)}
                                mode="currency"
                                currency="INR"
                                className={errors.totalFees ? "p-invalid" : ""}
                            />
                            {errors.totalFees && <Message severity="error" text={errors.totalFees} />}
                        </div>

                        {/* I-Card Number */}
                        <div className="col-12">
                            <label htmlFor="iCardNumber" className="block font-bold mb-2">I-Card Number</label>
                            <InputText
                                id="iCardNumber"
                                value={iCardNumber}
                                onChange={(e) => setICardNumber(e.target.value)}
                                className={errors.iCardNumber ? "p-invalid" : ""}
                            />
                            {errors.iCardNumber && <Message severity="error" text={errors.iCardNumber} />}
                        </div>

                        {/* Last School Attended */}
                        <div className="col-12">
                            <label htmlFor="lastSchool" className="block font-bold mb-2">Last School Attended</label>
                            <InputText
                                id="lastSchool"
                                value={lastSchool}
                                onChange={(e) => setLastSchool(e.target.value)}
                                className={errors.lastSchool ? "p-invalid" : ""}
                            />
                            {errors.lastSchool && <Message severity="error" text={errors.lastSchool} />}
                        </div>

                        {/* Last Class Studied */}
                        <div className="col-12">
                            <label htmlFor="lastClass" className="block font-bold mb-2">Last Class Studied</label>
                            <InputText
                                id="lastClass"
                                value={lastClass}
                                onChange={(e) => setLastClass(e.target.value)}
                                className={errors.lastClass ? "p-invalid" : ""}
                            />
                            {errors.lastClass && <Message severity="error" text={errors.lastClass} />}
                        </div>

                        {/* Reference */}
                        <div className="col-12">
                            <label htmlFor="reference" className="block font-bold mb-2">Reference</label>
                            <InputText
                                id="reference"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                className={errors.reference ? "p-invalid" : ""}
                            />
                            {errors.reference && <Message severity="error" text={errors.reference} />}
                        </div>

                        {/* Staff Name */}
                        <div className="col-12">
                            <label htmlFor="staffName" className="block font-bold mb-2">Staff Name *</label>
                            <InputText
                                id="staffName"
                                value={staffName}
                                onChange={(e) => setStaffName(e.target.value)}
                                className={errors.staffName ? "p-invalid" : ""}
                            />
                            {errors.staffName && <Message severity="error" text={errors.staffName} />}
                        </div>

                        {/* Additional Notes */}
                        <div className="col-12">
                            <label htmlFor="note" className="block font-bold mb-2">Additional Notes</label>
                            <InputText
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className={errors.note ? "p-invalid" : ""}
                            />
                            {errors.note && <Message severity="error" text={errors.note} />}
                        </div>

                        {/* Image Upload */}
                        <div className="col-12">
                            <label htmlFor="image" className="block font-bold mb-2">Upload Student Image *</label>
                            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                            {errors.image && <Message severity="error" text={errors.image} />}
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="col-12">
                            <div className="flex align-items-center">
                                <Checkbox inputId="agree" checked={agree} onChange={(e) => setAgree(e.checked)} className={errors.agree ? "p-invalid" : ""} />
                                <label htmlFor="agree" className="ml-2">I agree to the terms and conditions</label>
                            </div>
                            {errors.agree && <Message severity="error" text={errors.agree} />}
                        </div>

                        {/* Submit Button */}
                        <div className="col-12 flex justify-content-center">
                            <Button type="submit" label="Submit Form" icon="pi pi-check" className="p-button-lg p-button-primary" />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}