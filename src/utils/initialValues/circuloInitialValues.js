export const circuloInitialValues = (circulo) => {
    const now = new Date().getFullYear();

    const initialValues = {
        number: circulo ? circulo.number : '',
        name: circulo ? circulo.name : '',
        circulotype: circulo ? circulo.circulotype : 'urbano',
        normed_capacity2: circulo ? circulo.normed_capacity2 : '',
        normed_capacity3: circulo ? circulo.normed_capacity3 : '',
        normed_capacity4: circulo ? circulo.normed_capacity4 : '',
        normed_capacity5: circulo ? circulo.normed_capacity5 : '',
        normed_capacity6: circulo ? circulo.normed_capacity6 : '',
        attendance2: circulo ? circulo.attendance2 : 0,
        attendance3: circulo ? circulo.attendance3 : 0,
        attendance4: circulo ? circulo.attendance4 : 0,
        attendance5: circulo ? circulo.attendance5 : 0,
        attendance6: circulo ? circulo.attendance6 : 0,
        latlng: circulo ? circulo.latlng : [],
        isCiActive: circulo ? circulo.isCiActive : true,
        curso: circulo ? circulo.curso : now,
        };
        return initialValues;
    };
