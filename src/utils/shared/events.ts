import Fivem from "./events/fivem";
import Base from "./events/base";
import Weather from "./events/weather";

const Events = {
	Fivem,
	Base,
	Weather,
} as const;

export default Events;
