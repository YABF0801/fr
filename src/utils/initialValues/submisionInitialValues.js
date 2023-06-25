import { useAuthContext } from "../../core/context/authContext";

export const submisionInitialValues = (submision) => {

	const { isAuthenticated } = useAuthContext();
	const user = isAuthenticated.user?.nickname

	const initialValues = {
		finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'nueva',
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,	
			motive: submision ? submision.motive : 'necesito una matrícula',
			status: submision ? submision.status : 'pendiente',
			ciPedido: submision ? submision.ciPedido : '',
			createdBy: submision ? submision.ciPedido : user,

			child: {
				childName: submision ? submision.child.childName : 'Luis Ernesto',
				childLastname: submision ? submision.child.childLastname : 'Perez Fierce',
				carnet: submision ? submision.child.carnet : 22010824241,
				year_of_life: submision ? submision.child.year_of_life : 2,
				childAddress: submision ? submision.child.childAddress : 'calle 26 entre 39 y 41',
				neighborhood: submision ? submision.child.neighborhood : 'Nueva Gerona',
				cPopular: submision ? submision.child.cPopular : 'Nueva Gerona',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',

		/**/	circulo: submision ? submision.child.circulo.name: {
					_id: '',
					name: ''
					},
				matriculaDate: '',
				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : 'Alicia',
						parentLastname: submision ? submision.child.parents[0].parentLastname : 'Fierce Gómez',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : 'calle 26 entre 39 y 41',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '58555555',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : 'Banco Popular de Ahorro',
						workAddress: submision ? submision.child.parents[0].workAddress : 'Calle 18 entre 45 y 47',
						jobTitle: submision ? submision.child.parents[0].jobTitle : 'Comercial',

						organismo: submision ? submision.child.parents[0].organismo.name : {
							name: '',
							weight: 0
						},
						
						salary: submision ? submision.child.parents[0].salary : 6000,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents?.[1]?.parentName : '',
						parentLastname: submision ? submision.child.parents?.[1]?.parentLastname : '',
						typeParent: submision ? submision.child.parents?.[1]?.typeParent : 'padre',
						convivencia: submision ? submision.child.parents?.[1]?.convivencia : false,
						parentAddress: submision ? submision.child.parents?.[1]?.parentAddress : '',
						phoneNumber: submision ? submision.child.parents?.[1]?.phoneNumber : '',
						occupation: submision ? submision.child.parents?.[1]?.occupation : 'trabajador',
						workName: submision ? submision.child.parents?.[1]?.workName : '',
						workAddress: submision ? submision.child.parents?.[1]?.workAddress : '',
						jobTitle: submision ? submision.child.parents?.[1]?.jobTitle : '',
						salary: submision ? submision.child.parents?.[1]?.salary : 0,
					},
				],
			},
	};

	return initialValues;
};




		/* 		real
			initialValues: {
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'nueva',
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,	
			motive: submision ? submision.motive : '',
			status: submision ? submision.status : 'pendiente',
			ciPedido: submision ? submision.ciPedido : '',

			child: {
				childName: submision ? submision.child.childName : '',
				childLastname: submision ? submision.child.childLastname : '',
				carnet: submision ? submision.child.carnet : '',
				year_of_life: submision ? submision.child.year_of_life : '',
				childAddress: submision ? submision.child.childAddress : '',
				neighborhood: submision ? submision.child.neighborhood : '',
				cPopular: submision ? submision.child.cPopular : '',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',

		//	circulo: submision ? submision.child.circulo.name: '',

				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : '',
						parentLastname: submision ? submision.child.parents[0].parentLastname : '',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : '',
						workAddress: submision ? submision.child.parents[0].workAddress : '',
						jobTitle: submision ? submision.child.parents[0].jobTitle : '',

						organismo: submision ? submision.child.parents[0].organismo.name : '',
						
						salary: submision ? submision.child.parents[0].salary : 0,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents[1].parentName : '',
						parentLastname: submision ? submision.child.parents[1].parentLastname : '',
						typeParent: submision ? submision.child.parents[1].typeParent : 'padre',
						convivencia: submision ? submision.child.parents[1].convivencia : true,
						parentAddress: submision ? submision.child.parents[1].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[1].phoneNumber : '',
						occupation: submision ? submision.child.parents[1].occupation : 'trabajador',
						workName: submision ? submision.child.parents[1].workName : '',
						workAddress: submision ? submision.child.parents[1].workAddress : '',
						jobTitle: submision ? submision.child.parents[1].jobTitle : '',
						salary: submision ? submision.child.parents[1].salary : 0,
					},
				],
			},
		}, */