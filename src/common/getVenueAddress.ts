import { VenueAddress } from "./Interfaces";

export const getVenueAddress = (address_components: any[]) : VenueAddress => {
  
  let address: VenueAddress = {
    number: '',
    street: '',
    suburb: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  };

  address_components.forEach((addrComponent) => {
    switch(addrComponent.types[0]){
      case 'street_number':
        address.number = addrComponent.long_name;
        break;
      case 'route':
        address.street = addrComponent.long_name;
        break;
      case 'locality':
        address.suburb = addrComponent.long_name;
        break;
      case 'administrative_area_level_2':
        address.city = addrComponent.long_name;
        break;
      case 'administrative_area_level_1':
        address.state = addrComponent.short_name;
        break;
      case 'country':
        address.country = addrComponent.short_name;
        break;
      case 'postal_code':
        address.zipcode = addrComponent.short_name;
        break;
      default:
        break;
    }
  })
    
  return address;
};

  