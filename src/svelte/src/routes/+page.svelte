<script lang="ts">
    import { onMount } from 'svelte';
		import dayjs from 'dayjs'
		import { products } from '../store'

    type FormErrors = {
			name?: string;
			prefix?: string;
			email?: string;
			birthdate?: string;
			product?: string;
			subject?: string;
			message?: string;
			consent?: string
    };

    onMount(async () => {
        await import('dap-design-system');
    });

    let name = '';
		let prefix = '';
		let email = '';
		let product = '';
		let birthday = '';
		let message = '';
		let subject = '';
		let consent = false;
    let errors: FormErrors = {};

    function validate() {
        errors = {};

        if (!name) errors.name = 'Add meg a teljes neved!'
				if (!prefix) errors.prefix = 'Válassz megnevezést!'
				if (!email) errors.email = 'Add meg az email címed!'
				if (email && !email.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)) {
						errors.email = 'Hibás email cím!';
				}
				if (!product) errors.product = 'Válassz kedvenc terméket!'
				if (!birthday) errors.birthdate = 'Add meg a születési dátumod!';
				if (!message) errors.message = 'Add meg az üzeneted!';
				if (!consent) errors.consent = 'Fogadd el az Adatkezelési tájékoztatót!';
    }

		const getProducts = async(filter: string) => {
			const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`)
			const json = await response.json()


			products.set(json.products.filter((item: any) => item.title.toLowerCase().startsWith(filter.toLowerCase())))
  	}

    function handleSubmit() {
        validate();
        if (Object.keys(errors).length === 0) {
            window.showDapSnackbar && window.showDapSnackbar('Gratulálunk! Minden mező helyes!', {
                duration: 4500,
                alertType: 'successful',
                actions: [
                    { href: 'https://sg.hu', text: 'SG' },
                    { href: 'https://index.hu', text: 'Index' },
                ],
            })
        }
    }
</script>

<dap-ds-snackbar></dap-ds-snackbar>
<form onsubmit={handleSubmit}>
    <dap-ds-stack>
        <dap-ds-input
						label="Teljes név"
            value={name}
            ondds-input={(event: any) => name = event.detail.value}
            feedback={errors.name}
            feedbackType="negative"
        >
        </dap-ds-input>
				<dap-ds-select
					label="Megnevezés"
					value={prefix}
					feedback={errors.prefix}
					feedbackType="negative"
					ondds-change={(e: any) => prefix = e.detail.value}>
						<dap-ds-option-item value="mr">Úr</dap-ds-option-item>
						<dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
						<dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
				</dap-ds-select>
				<dap-ds-input
					label="E-mail cím"
					value={email}
					ondds-input={(event: any) => email = event.detail.value}
					feedback={errors.email}
					feedbackType="negative"
				>
				</dap-ds-input>
				<dap-ds-datepicker
					label="Születési dátum"
					description="Add meg a születési dátumod!"
					value={birthday}
					feedback={errors.birthdate}
					feedbackType='negative'
					ondds-change={(e: any) => {
						console.log(e)
						birthday = e.detail.value
					}}
					ondds-invalid-date={(e: any) => {
						console.log(e)
						if (e.detail.type === 'invalid') {
							errors.birthdate = `Érvénytelen dátum: ${dayjs.Ls[dayjs.locale()].formats.L}`
						}

						if (e.detail.type === 'out-of-range') {
							errors.birthdate = 'Nem választható dátum!'
						}
					}}
					ondds-valid-date={(e: any) => {
						console.log(e)
						errors.birthdate = ''
					}}
				>
				</dap-ds-datepicker>
				<dap-ds-combobox
					id="product"
					label="Kedvenc terméked"
					name="product"
					value={product}
					feedback={errors?.product}
					feedbackType="negative"
					ondds-change={(e: any) => {
						console.log(e)
						product = e.detail.value
					}}
					ondds-input={(e: any) => {
						getProducts(e.detail.input)
					}}
					sync
					placeholder="Válassz egy terméket">
					{#each $products as product}
						<dap-ds-option-item key={product.id} value={product.id} label={product.title}>
							{product.title}
						</dap-ds-option-item>
					{/each}
				</dap-ds-combobox>
				<dap-ds-input
					label="Tárgy"
					value={subject}
					optional
					optionalLabel="(Nem kötelező)"
					ondds-change={(event: any) => subject = event.detail.value}
				></dap-ds-input>
				<dap-ds-textarea
					label="Üzenet"
					value={message}
					ondds-change={(event: any) => message = event.detail.value}
					feedback={errors.message}
					feedbackType="negative"
				></dap-ds-textarea>
				<dap-ds-checkbox
					label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
					ondds-change={(e: any) => consent = e.detail.checked}
					feedback={errors?.consent}
					feedbackType="negative"
				></dap-ds-checkbox>
        <dap-ds-button htmlType="submit">Submit</dap-ds-button> 
    </dap-ds-stack>
</form>
