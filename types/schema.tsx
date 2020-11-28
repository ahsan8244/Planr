export interface Venue {
	name: string;
	geolocation: {
		longitude: {
			x: number;
			y: number;
		},
		latitude: {
			x: number;
			y: number;
		}
	}
};

export interface Course {
	code: string;
	name: string;
	prereqs: Course[];
	desc: string;
	venue: Venue;
	Timeslot: Date[];
};

export interface Major {
	name: string;
	reqs: {
		core: Course[],
		elective: Course[]
	}
};

export interface Schedule {
	courses: Course[];
}