import { useAuthContext } from "../../core/context/authContext";

export const submisionInitialValues = (submision) => {

	const { isAuthenticated } = useAuthContext();
	const user = isAuthenticated.user?.nickname

	const initialValues = {
		finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'nueva',
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,	
			motive: submision ? submision.motive : 'me da la gana',
			status: submision ? submision.status : 'pendiente',
			ciPedido: submision ? submision.ciPedido : '',
			createdBy: submision ? submision.ciPedido : user,

			child: {
				childName: submision ? submision.child.childName : 'Perico',
				childLastname: submision ? submision.child.childLastname : 'Perez',
				carnet: submision ? submision.child.carnet : 19010824651,
				year_of_life: submision ? submision.child.year_of_life : 2,
				childAddress: submision ? submision.child.childAddress : 'mi casita',
				neighborhood: submision ? submision.child.neighborhood : 'mi barrio',
				cPopular: submision ? submision.child.cPopular : 'Micro 70',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',

		/**/	circulo: submision ? submision.child.circulo.name: {
					_id: '',
					name: ''
					},

				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : 'Madre',
						parentLastname: submision ? submision.child.parents[0].parentLastname : 'Apellido Madre',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : 'mi casita',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '58029954',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : 'mi trabajo',
						workAddress: submision ? submision.child.parents[0].workAddress : 'donde queda la oficina',
						jobTitle: submision ? submision.child.parents[0].jobTitle : 'jefa de todo',

						organismo: submision ? submision.child.parents[0].organismo.name : {
							name: '',
							weight: 0
						},
						
						salary: submision ? submision.child.parents[0].salary : 15000,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents[1].parentName : 'El padre',
						parentLastname: submision ? submision.child.parents[1].parentLastname : 'Apellidos Padre',
						typeParent: submision ? submision.child.parents[1].typeParent : 'padre',
						convivencia: submision ? submision.child.parents[1].convivencia : false,
						parentAddress: submision ? submision.child.parents[1].parentAddress : 'su propia casa',
						phoneNumber: submision ? submision.child.parents[1].phoneNumber : '58029954',
						occupation: submision ? submision.child.parents[1].occupation : 'trabajador',
						workName: submision ? submision.child.parents[1].workName : 'su trabajo',
						workAddress: submision ? submision.child.parents[1].workAddress : 'que se yo',
						jobTitle: submision ? submision.child.parents[1].jobTitle : 'jefe tambien',
						salary: submision ? submision.child.parents[1].salary : 15000,
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