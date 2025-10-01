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

import PersonIcon from "@icons/person.svg";
import SearchIcon from "@icons/search.svg";

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
			<style>{`
        /* Test-specific layout styles */
        /*.demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .color-palette {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .color-card {
          padding: 2rem 1rem;
          border-radius: 0.5rem;
          text-align: center;
          color: white;
          font-weight: 600;
        }

        .primary { background-color: #3b82f6; }
        .secondary { background-color: #1e40af; }
        .accent { background-color: #93c5fd; color: #111827; }
        .neutral { background-color: #8b949e; }
        .success { background-color: #22c55e; }
        .danger { background-color: #ef4444; }
        .warning { background-color: #fbbf24; }

        .section {
          margin: 3rem 0;
          padding: 2rem 0;
          border-bottom: 1px solid #374151;
        }

        .component-demo {
          background-color: #1f2937;
          padding: 2rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }*/

        /* Chess board styles */
        /*.chess-board {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 0;
          border: 2px solid #4a5568;
          aspect-ratio: 1;
          width: 100%;
          max-width: 400px;
        }

        .chess-square {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .light-square { background-color: #f7fafc; }
        .dark-square { background-color: #4a5568; }
        .selected { background-color: #3182ce; }
        .valid-move { background-color: #38a169; }

        .chess-piece {
          font-size: 32px;
          user-select: none;
        }

        .dark-piece { color: #2d3748; }
        .light-piece { color: #f7fafc; }*/

        /* Game UI components */
        /*.player-info {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: #2d3748;
          border-radius: 0.5rem;
          border: 2px solid transparent;
        }

        .player-info.active-player {
          border-color: #3182ce;
        }

        .player-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3182ce;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 1rem;
        }

        .player-details {
          flex: 1;
        }

        .player-name {
          font-weight: 600;
          color: #f7fafc;
        }

        .player-stats {
          color: #a0aec0;
          font-size: 0.875rem;
        }

        .player-timer {
          font-family: 'Courier New', monospace;
          font-size: 1.25rem;
          font-weight: bold;
          color: #3182ce;
        }

        .game-status {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          text-align: center;
          font-weight: 600;
        }

        .status-playing {
          background-color: #38a169;
          color: white;
        }

        .move-history {
          background-color: #2d3748;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .move-item {
          display: flex;
          align-items: center;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }

        .move-item.current-move {
          background-color: #4a5568;
        }

        .move-number {
          color: #a0aec0;
          margin-right: 0.5rem;
        }

        .move-notation {
          flex: 1;
          color: #f7fafc;
        }

        .move-time {
          color: #a0aec0;
          font-size: 0.875rem;
        }*/

        /* Navigation styles */
        /*.navbar {
          background-color: #2d3748;
          padding: 1rem 0;
          border-bottom: 1px solid #4a5568;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #3182ce;
          text-decoration: none;
        }

        .navbar-nav {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }

        .navbar-link {
          color: #a0aec0;
          text-decoration: none;
          padding: 0.5rem;
          border-radius: 0.25rem;
          transition: color 0.2s;
        }

        .navbar-link:hover,
        .navbar-link.active {
          color: #3182ce;
        }

        .tabs {
          margin: 2rem 0;
        }

        .tab-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          border-bottom: 1px solid #4a5568;
        }

        .tab-link {
          display: block;
          padding: 1rem 1.5rem;
          color: #a0aec0;
          text-decoration: none;
          border-bottom: 2px solid transparent;
        }

        .tab-link.active {
          color: #3182ce;
          border-bottom-color: #3182ce;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }

        .breadcrumb-item {
          color: #a0aec0;
        }

        .breadcrumb-item:not(:last-child)::after {
          content: '/';
          margin: 0 0.5rem;
          color: #4a5568;
        }

        .breadcrumb-item a {
          color: #3182ce;
          text-decoration: none;
        }*/

        /* Form styles */
        /*.form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #4a5568;
          border-radius: 0.375rem;
          background-color: #2d3748;
          color: #f7fafc;
        }

        .form-control:focus {
          outline: none;
          border-color: #3182ce;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }*/

        /* Textarea specific styles */
        /*.form-control-sm {
          padding: 0.5rem;
          font-size: 0.875rem;
        }

        .form-control-lg {
          padding: 1rem;
          font-size: 1.125rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #f7fafc;
        }

        .form-label.required::after {
          content: ' *';
          color: #ef4444;
        }

        .form-check {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .form-check input[type="checkbox"],
        .form-check input[type="radio"] {
          margin-right: 0.5rem;
        }

        .form-check-label {
          color: #f7fafc;
        }

        .form-switch {
          display: flex;
          align-items: center;
          position: relative;
          width: 44px;
          height: 24px;
        }

        .form-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #4a5568;
          transition: 0.4s;
          border-radius: 24px;
        }

        .switch-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .switch-slider {
          background-color: #3182ce;
        }

        input:checked + .switch-slider:before {
          transform: translateX(20px);
        }

        .has-error .form-control {
          border-color: #ef4444;
        }

        .has-success .form-control {
          border-color: #38a169;
        }*/
      `}</style>
			{/* Navigation Demo */}
			<nav className="navbar">
				<div className="navbar-container">
					<a href="#" className="navbar-brand">
						♔ Chess Variants
					</a>
					<ul className="navbar-nav">
						<li className="navbar-item">
							<a href="#" className="navbar-link active">
								Home
							</a>
						</li>
						<li className="navbar-item">
							<a href="#" className="navbar-link">
								Play
							</a>
						</li>
						<li className="navbar-item">
							<a href="#" className="navbar-link">
								Learn
							</a>
						</li>
						<li className="navbar-item">
							<a href="#" className="navbar-link">
								Settings
							</a>
						</li>
					</ul>
				</div>
			</nav>
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
								<Dropdown
									options={chessVariants.slice(1)}
									onChange={(value) => console.log("Selected:", value)}
								/>
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
