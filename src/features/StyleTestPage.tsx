import React, { useState } from "react";
import { Alert } from "../components/Alert.js";
import { Badge } from "../components/Badge.js";
import { Button } from "../components/Button.js";
import { Card } from "../components/Card.js";
import { CheckboxList } from "../components/CheckboxList.js";
import { Dropdown } from "../components/Dropdown.js";
import { Form } from "../components/Form.js";
import { FormDropdown } from "../components/FormDropdown.js";
import { FormGrid, FormCol, FormColAuto } from "../components/FormGrid.js";
import { FormGroup } from "../components/FormGroup.js";
import { FormInput } from "../components/FormInput.js";
import { FormSection } from "../components/FormSection.js";
import { FormTextarea } from "../components/FormTextarea.js";
import { Loading } from "../components/Loading.js";
import { Modal } from "../components/Modal.js";
import { NotificationManager } from "../components/Notification.js";
import { Progress } from "../components/Progress.js";
import { Radio } from "../components/Radio.js";
import { Toggle } from "../components/Toggle.js";
import { NavBar } from "../components/NavBar.js";

import PersonIcon from "@icons/person.svg";
import SearchIcon from "@icons/search.svg";
import KnightIcon from "@icons/knight.svg";

export function StyleTestPage() {
	const [showDemoModal, setShowDemoModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	// Modal form state
	const [modalTimeControl, setModalTimeControl] = useState("5-minutes");
	const [modalGameVariant, setModalGameVariant] = useState("standard");

	type FormData = {
		playerName: string;
		email: string;
		gameVariant: string;
		timeControl: string;
		gameNotes: string;
		notifications: boolean;
		sounds: boolean;
		analysis: boolean;
		highlights: boolean;
		theme: string;
		autosave: boolean;
		darkmode: boolean;
		coordinates: boolean;
	};

	const [formData, setFormData] = useState<FormData>({
		playerName: "ChessMaster",
		email: "",
		gameVariant: "",
		timeControl: "blitz",
		gameNotes: "",
		notifications: true,
		sounds: false,
		analysis: true,
		highlights: false,
		theme: "classic",
		autosave: true,
		darkmode: false,
		coordinates: true
	});

	// Example options for dropdowns
	const chessVariants = [
		{ value: "", label: "Select a variant...", disabled: true },
		{ value: "standard", label: "Standard Chess" },
		{ value: "kingofhill", label: "King of the Hill" },
		{ value: "threecheck", label: "Three-Check" },
		{ value: "atomic", label: "Atomic Chess" },
		{ value: "crazyhouse", label: "Crazyhouse" }
	];

	const timeControls = [
		{ value: "blitz", label: "5+3 Blitz" },
		{ value: "rapid", label: "10+5 Rapid" },
		{ value: "classical", label: "30+0 Classical" },
		{ value: "unlimited", label: "Unlimited" }
	];

	const themeOptions = [
		{ value: "classic", label: "Classic Wood" },
		{ value: "modern", label: "Modern Glass" },
		{ value: "marble", label: "Marble Stone" }
	];

	// Modal dropdown options
	const modalTimeControlOptions = [
		{ value: "5-minutes", label: "5 minutes" },
		{ value: "10-minutes", label: "10 minutes" },
		{ value: "30-minutes", label: "30 minutes" }
	];

	const modalGameVariantOptions = [
		{ value: "standard", label: "Standard Chess" },
		{ value: "kingofhill", label: "King of the Hill" },
		{ value: "threecheck", label: "Three-Check" },
		{ value: "atomic", label: "Atomic Chess" }
	];

	const gamePreferences = [
		{ id: "notifications", label: "Enable move notifications", checked: formData.notifications },
		{ id: "sounds", label: "Play move sounds", checked: formData.sounds },
		{ id: "analysis", label: "Show move analysis", checked: formData.analysis },
		{ id: "highlights", label: "Highlight possible moves", checked: formData.highlights }
	];

	const handleInputChange = (field: keyof FormData, value: FormData[keyof FormData]) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const closeModal = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		setModal(false);
		document.body.style.overflow = "";
	};

	const openModal = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		setModal(true);
		document.body.style.overflow = "hidden";
	};

	return (
		<div>
			{/* Navigation Demo */}
			<NavBar
				brand={{ text: "Chess Variant Simulator", href: "#" }}
				brandIcon={KnightIcon}
				items={[
					{ label: "Home", href: "#", active: true },
					{ label: "Play", href: "#" },
					{ label: "Learn", href: "#" },
					{ label: "Settings", href: "#" }
				]}
				onItemClick={(href) => console.log("Navigating to:", href)}
			/>
			<div className="container">
				<header className="section">
					<h1>Chess Variant Simulator - Component Library</h1>
				</header>
				{/* Buttons Section */}
				<section className="section">
					<h2>Button Components</h2>

					<h3>Button Variants</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
						<Button variant="primary" text="Primary" />
						<Button variant="secondary" text="Secondary" />
						<Button variant="success" text="Success" />
						<Button variant="danger" text="Danger" />
						<Button variant="warning" text="Warning" />
					</div>

					<h3>Disabled Buttons</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
						<Button variant="primary" text="Primary Disabled" disabled />
						<Button variant="secondary" text="Secondary Disabled" disabled />
						<Button variant="success" text="Success Disabled" disabled />
						<Button variant="danger" text="Danger Disabled" disabled />
						<Button variant="warning" text="Warning Disabled" disabled />
					</div>

					<h3>Outline Buttons</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
						<Button styleType="outline" variant="primary" text="Outline Primary" />
						<Button styleType="outline" variant="secondary" text="Outline Secondary" />
						<Button styleType="outline" variant="success" text="Outline Success" />
						<Button styleType="outline" variant="danger" text="Outline Danger" />
						<Button styleType="outline" variant="warning" text="Outline Warning" />
					</div>

					<h3>Disabled Outline Buttons</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
						<Button styleType="outline" variant="primary" text="Outline Primary Disabled" disabled />
						<Button styleType="outline" variant="secondary" text="Outline Secondary Disabled" disabled />
						<Button styleType="outline" variant="success" text="Outline Success Disabled" disabled />
						<Button styleType="outline" variant="danger" text="Outline Danger Disabled" disabled />
						<Button styleType="outline" variant="warning" text="Outline Warning Disabled" disabled />
					</div>

					<h3>Button Sizes & Shapes</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", margin: "1rem 0" }}>
						<Button variant="primary" size="sm" text="Small" />
						<Button variant="primary" size="md" text="Default" />
						<Button variant="primary" size="lg" text="Large" />
						<Button variant="primary" size="pill" text="Pill Shape" />
						<Button variant="primary" size="icon-sm" text="♔" />
					</div>

					<Button variant="primary" size="block" text="Block Button (Full Width)" />
				</section>
				{/* Cards Section */}
				<section className="section">
					<h2>Card Components</h2>
					<div className="demo-grid">
						<Card
							header={<h3>Basic Card</h3>}
							footer={
								<div>
									<Button variant="primary" size="sm" text="Action" />
									<span style={{ marginLeft: "1rem" }}>Footer info</span>
								</div>
							}
						>
							<p>This is a basic card with header and body content. Perfect for displaying game information.</p>
						</Card>

						<Card variant="primary" header={<h3>Primary Card</h3>}>
							<p>A card with primary styling, great for highlighting important content.</p>
						</Card>

						<Card interactive>
							<h4>Interactive Card</h4>
							<p>This card responds to hover and click events.</p>
						</Card>
					</div>
				</section>
				{/* Forms Section */}
				<section className="section">
					<h2>Form Components</h2>

					{/* Advanced Form with New Components */}
					<FormSection
						title="Advanced Form Components"
						subtitle="Showcasing FormSection, FormGrid, and enhanced form controls"
					>
						<Form title="Game Setup Form">
							<FormGrid>
								<FormCol>
									<FormGroup label="Player Name">
										<FormInput
											value={formData.playerName}
											onChange={(e) => handleInputChange("playerName", e.target.value)}
											placeholder="Enter your name"
											required
											icon={<img src={PersonIcon} width="16" height="16" alt="Person" />}
										/>
									</FormGroup>
								</FormCol>
								<FormCol>
									<FormGroup label="Email Address">
										<FormInput
											type="email"
											value={formData.email}
											onChange={(e) => handleInputChange("email", e.target.value)}
											placeholder="player@example.com"
										/>
									</FormGroup>
								</FormCol>
							</FormGrid>

							<FormGrid>
								<FormCol>
									<FormDropdown
										label="Game Variant"
										options={chessVariants}
										value={formData.gameVariant}
										onChange={(value) => handleInputChange("gameVariant", value)}
										required
									/>
								</FormCol>
								<FormCol>
									<FormDropdown
										label="Time Control"
										options={timeControls}
										value={formData.timeControl}
										onChange={(value) => handleInputChange("timeControl", value)}
									/>
								</FormCol>
							</FormGrid>

							<FormTextarea
								label="Game Notes"
								value={formData.gameNotes}
								onChange={(e) => handleInputChange("gameNotes", e.target.value)}
								placeholder="Add any notes about this game..."
								maxLength={500}
								showCount
								autoResize
								helpText="Optional description or strategy notes"
							/>
						</Form>
					</FormSection>

					<FormSection title="Form Validation & States" collapsible defaultExpanded={false}>
						<FormGrid>
							<FormCol>
								<FormGroup label="Email (Error State)">
									<FormInput type="email" defaultValue="invalid-email" />
									<div className="form-feedback danger">Please enter a valid email address.</div>
								</FormGroup>
							</FormCol>
							<FormCol>
								<FormGroup label="Username (Success State)">
									<FormInput defaultValue="player123" />
									<div className="form-feedback success">Username is available!</div>
								</FormGroup>
							</FormCol>
						</FormGrid>

						<FormGroup label="Search Players">
							<FormInput
								placeholder="Search for players..."
								icon={<img src={SearchIcon} width="16" height="16" alt="Search" />}
							/>
							<div className="form-feedback primary">Find players to invite to your game</div>
						</FormGroup>
					</FormSection>

					<div className="demo-grid">
						<CheckboxList
							name="gamePreferences"
							legend="Game Preferences"
							options={gamePreferences}
							values={gamePreferences
								.filter((pref) => {
									const key = pref.id as keyof typeof formData;
									return formData[key] === true;
								})
								.map((pref) => pref.id)}
							onChange={(values) => {
								// Reset all preferences first
								gamePreferences.forEach((pref) => {
									const key = pref.id as keyof typeof formData;
									handleInputChange(key, false);
								});
								// Set selected preferences
								values.forEach((value) => {
									const key = value as keyof typeof formData;
									handleInputChange(key, true);
								});
							}}
						/>

						<Radio
							name="theme"
							label="Board Theme"
							options={themeOptions}
							value={formData.theme}
							onChange={(value) => handleInputChange("theme", value)}
							layout="vertical"
						/>

						<Card header={<h3>Toggle Switches & Controls</h3>}>
							<Toggle
								id="autosave"
								label="Auto-save games"
								checked={formData.autosave}
								onChange={(checked) => handleInputChange("autosave", checked)}
							/>

							<Toggle
								id="darkmode"
								label="Dark mode"
								checked={formData.darkmode}
								onChange={(checked) => handleInputChange("darkmode", checked)}
							/>

							<Toggle
								id="coordinates"
								label="Show coordinates"
								checked={formData.coordinates}
								onChange={(checked) => handleInputChange("coordinates", checked)}
							/>

							<FormGroup label="Game Rating">
								<FormInput type="number" defaultValue="1200" min="100" max="3000" />
								<div className="form-feedback primary">Your current chess rating</div>
							</FormGroup>
						</Card>

						<Card header={<h3>Form Sizes & Input Types</h3>}>
							<FormGroup label="Small Input">
								<input type="text" className="form-control form-control-sm" placeholder="Small size input" />
							</FormGroup>

							<FormGroup label="Default Input">
								<input type="text" className="form-control" placeholder="Default size input" />
							</FormGroup>

							<FormGroup label="Large Input">
								<input type="text" className="form-control form-control-lg" placeholder="Large size input" />
							</FormGroup>

							<FormGroup label="Disabled Input">
								<input type="text" className="form-control" placeholder="This input is disabled" disabled />
							</FormGroup>

							<FormGroup label="Readonly Input">
								<input type="text" className="form-control" defaultValue="This is readonly" readOnly />
							</FormGroup>

							<FormGrid>
								<FormColAuto>
									<Button variant="primary" type="submit" text="Submit Form" />
								</FormColAuto>
								<FormColAuto>
									<Button variant="secondary" type="button" text="Cancel" />
								</FormColAuto>
							</FormGrid>
						</Card>
					</div>

					{/* Standalone Dropdown Demo */}
					<FormSection title="Standalone Components" subtitle="Components used outside of forms">
						<div style={{ display: "flex", gap: "2rem", alignItems: "start", flexWrap: "wrap", margin: "1rem 0" }}>
							<div>
								<h4>Standalone Dropdown</h4>
								<Dropdown options={chessVariants.slice(1)} onChange={(value) => console.log("Selected:", value)} />
							</div>
							<div>
								<h4>Disabled Dropdown</h4>
								<Dropdown options={timeControls} disabled />
							</div>
						</div>
					</FormSection>
				</section>{" "}
				{/* Navigation Components */}
				<section className="section">
					<h2>Navigation Components</h2>

					<h3>Tabs</h3>
					<div className="tabs">
						<ul className="tab-list">
							<li className="tab-item">
								<a href="#" className="tab-link active">
									Game
								</a>
							</li>
							<li className="tab-item">
								<a href="#" className="tab-link">
									Analysis
								</a>
							</li>
							<li className="tab-item">
								<a href="#" className="tab-link">
									History
								</a>
							</li>
						</ul>
					</div>

					<h3>Breadcrumbs</h3>
					<nav className="breadcrumb">
						<div className="breadcrumb-item">
							<a href="#">Home</a>
						</div>
						<div className="breadcrumb-item">
							<a href="#">Games</a>
						</div>
						<div className="breadcrumb-item">Standard Chess</div>
					</nav>
				</section>
				{/* Utility Components */}
				<section className="section">
					<h2>Utility Components</h2>

					<div className="demo-grid">
						<div>
							<h3>Loading States</h3>
							<div style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1rem 0" }}>
								<Loading size="sm" />
								<Loading size="md" />
								<Loading size="lg" />
								<Loading size="xl" />
							</div>
						</div>

						<div>
							<h3>Progress Bars</h3>
							<Progress value={75} max={100} style={{ margin: "1rem 0" }} />
							<Progress type="striped" variant="success" value={60} max={100} />
						</div>

						<div>
							<h3>Badges</h3>
							<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0", alignItems: "center" }}>
								<Badge variant="success" text="Active Player" />
								<Badge variant="danger" text="Game Over" />
								<Badge variant="warning" text="Time Running Out" />
								<Badge text="Your Turn" />
								<Badge variant="neutral" text="Neutral" />
							</div>

							<h4 style={{ marginTop: "1.5rem" }}>Outline Badges</h4>
							<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0", alignItems: "center" }}>
								<Badge type="outline" variant="success" text="Winner" />
								<Badge type="outline" variant="danger" text="Check" />
								<Badge type="outline" variant="warning" text="Warning" />
								<Badge type="outline" text="Spectating" />
								<Badge type="outline" variant="neutral" text="Neutral" />
							</div>
						</div>

						<div>
							<h3>Alerts</h3>
							<Alert variant="success" title="Game Won!" message="Congratulations, you've won the game!" />
							<Alert variant="warning" title="Time Warning" message="You have less than 2 minutes remaining." />
							<Alert variant="danger" title="Check!" message="You are in check! Make a move to escape." />
							<Alert variant="info" title="Information" message="It's your turn to move." />
							<Alert variant="neutral" title="Neutral" message="This is a neutral alert." />
						</div>
					</div>
				</section>
				{/* Notification Components */}
				<section className="section">
					<h2>Notification Components</h2>
					<div className="component-demo">
						<h3>Toast Notifications</h3>
						<p>Click the buttons below to trigger different toast notifications:</p>
						<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
							<Button
								variant="success"
								onClick={() => NotificationManager.showSuccess("Success!", "Your game has been saved successfully.")}
								text="Show Success Notification"
							/>
							<Button
								variant="danger"
								onClick={() => NotificationManager.showError("Error!", "Failed to connect to game server.")}
								text="Show Error Notification"
							/>
							<Button
								variant="warning"
								onClick={() => NotificationManager.showWarning("Warning!", "Your time is running low.")}
								text="Show Warning Notification"
							/>
							<Button
								variant="primary"
								onClick={() => NotificationManager.showInfo("Info", "A new game update is available.")}
								text="Show Info Notification"
							/>
						</div>
						<p>
							<small>Toast notifications will appear in the top-right corner of the screen.</small>
						</p>
					</div>
				</section>
				{/* Modal Components */}
				<section className="section">
					<h2>Modal Components</h2>
					<div className="component-demo">
						<h3>Modal Dialogs</h3>
						<p>Click the buttons below to see different modal variations:</p>
						<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
							<Button variant="primary" onClick={() => openModal(setShowDemoModal)} text="Open Settings Modal" />
							<Button variant="secondary" onClick={() => openModal(setShowInfoModal)} text="Open Info Modal" />
							<Button variant="danger" onClick={() => openModal(setShowConfirmModal)} text="Open Confirmation Modal" />
						</div>
					</div>
				</section>
			</div>
			{/* Notification Container */}
			<div className="notification-container" id="notification-container"></div>
			{/* Demo Modals */}
			{showDemoModal && (
				<Modal
					id="demo-modal"
					title="Game Settings"
					onClose={() => closeModal(setShowDemoModal)}
					footer={
						<div>
							<Button variant="secondary" onClick={() => closeModal(setShowDemoModal)} text="Cancel" />
							<Button variant="primary" style={{ marginLeft: "1rem" }} text="Save Settings" />
						</div>
					}
				>
					<p>Configure your game settings and preferences.</p>
					<FormGroup label="Time Control">
						<Dropdown
							options={modalTimeControlOptions}
							value={modalTimeControl}
							onChange={(value) => setModalTimeControl(value)}
						/>
					</FormGroup>
					<FormGroup label="Game Variant">
						<Dropdown
							options={modalGameVariantOptions}
							value={modalGameVariant}
							onChange={(value) => setModalGameVariant(value)}
						/>
					</FormGroup>
				</Modal>
			)}{" "}
			{showInfoModal && (
				<Modal
					id="info-modal"
					title="Game Information"
					onClose={() => closeModal(setShowInfoModal)}
					footer={<Button variant="primary" onClick={() => closeModal(setShowInfoModal)} text="Got it!" />}
				>
					<p>Learn about the current chess variant and its rules.</p>
					<h4>King of the Hill</h4>
					<p>Win by getting your king to the center four squares (d4, d5, e4, e5) or by traditional checkmate.</p>
					<Alert
						variant="info"
						title="Pro Tip"
						message="Control the center early to limit your opponent's king mobility."
					/>
				</Modal>
			)}
			{showConfirmModal && (
				<Modal
					id="confirm-modal"
					title="Resign Game"
					onClose={() => closeModal(setShowConfirmModal)}
					footer={
						<div>
							<Button variant="secondary" onClick={() => closeModal(setShowConfirmModal)} text="Cancel" />
							<Button variant="danger" style={{ marginLeft: "1rem" }} text="Yes, Resign" />
						</div>
					}
				>
					<Alert
						variant="warning"
						title="Are you sure?"
						message="This action cannot be undone. You will lose this game."
					/>
					<p>Do you really want to resign from this game?</p>
				</Modal>
			)}
		</div>
	);
}
