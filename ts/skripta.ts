window.onload = function () {
    var studentStorage = new StudentStorage("ime", "prezime", "fakultet", "indeks", "predmeti", "tekst");     
};

class Predmet {
    private _id: number;
    private _naziv_predmeta: string;
    private _profesor: string;
    private _ocena: number;


	constructor(id: number, naziv_predmeta: string, profesor: string, ocena: number) {
		this._id = id;
		this._naziv_predmeta = naziv_predmeta;
		this._profesor = profesor;		
        this._ocena = ocena;
	}


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}


    /**
     * Getter profesor
     * @return {string}
     */
	public get profesor(): string {
		return this._profesor;
	}

    /**
     * Setter profesor
     * @param {string} value
     */
	public set profesor(value: string) {
		this._profesor = value;
	}


    /**
     * Getter naziv_predmeta
     * @return {string}
     */
	public get naziv_predmeta(): string {
		return this._naziv_predmeta;
	}

    /**
     * Setter naziv_predmeta
     * @param {string} value
     */
	public set naziv_predmeta(value: string) {
		this._naziv_predmeta = value;
	}


    /**
     * Getter ocena
     * @return {number}
     */
	public get ocena(): number {
		return this._ocena;
	}

    /**
     * Setter ocena
     * @param {number} value
     */
	public set ocena(value: number) {
		this._ocena = value;
	}
    

}

class Student {

    private _ime: string;
    private _prezime: string;
    private _fakultet: string;
    private _broj_indeksa: string;
    private _prosecna_ocena: string;
    private _polozeni_predmeti: Predmet[] = [];    

	constructor(ime: string, prezime: string, fakultet: string, broj_indeksa: string, predmeti: string) {
        this._ime = ime;
        this._prezime = prezime;
        this._fakultet = fakultet;
        this._broj_indeksa = broj_indeksa;        
        this._setPolozeniPredmeti(predmeti);
	}

    private _setPolozeniPredmeti(str: string): void {
        let arr = str.split(";"); // id p1, naziv p1, profesor p1, ocena p1;             
        for (let i in arr) {                            
            let tmp: any[] = arr[i].split(",");            
            this._polozeni_predmeti.push(new Predmet(Number(tmp[0]), tmp[1], tmp[2], Number(tmp[3])));            
        }
    }

    getPolozeniPredmeti(): Predmet[] {
        return this._polozeni_predmeti;
    }
    

    izracunajProsecnuOcenu(): void {
        let suma_ocena: number = 0;
        for (let i of this._polozeni_predmeti) {
            suma_ocena += i.ocena;
        }                  
        let prosek = suma_ocena / this._polozeni_predmeti.length;
        this._prosecna_ocena = prosek.toFixed(2);
    }

    public predstaviSe(): string {
        let ime_prezime: string = this._ime + " " + this._prezime;
        let naziv_fakulteta: string = this._fakultet;
        this.izracunajProsecnuOcenu();
        let prosecna_ocena = this._prosecna_ocena;
        return `<p>Ja sam ${ime_prezime} i studiram na ${naziv_fakulteta}, sa prosecnom ocenom ${prosecna_ocena}.</p>`;
    }

}

class StudentStorage {

    private _imeInput: HTMLInputElement;
    private _prezimeInput: HTMLInputElement;
    private _fakultetInput: HTMLInputElement;
    private _brojIndeksaInput: HTMLInputElement;
    private _predmetiInput: HTMLTextAreaElement;
    private _jumbo: HTMLDivElement;    


    public static fioka: Student[] = [];

    constructor(imeInput: string, prezimeInput: string, fakultetInput: string, brojIndeksaInput: string, predmetiInput: string, jumbo: string) {
        this._imeInput = document.getElementById(imeInput) as HTMLInputElement;
        this._prezimeInput = document.getElementById(prezimeInput) as HTMLInputElement;
        this._fakultetInput = document.getElementById(fakultetInput) as HTMLInputElement;
        this._brojIndeksaInput = document.getElementById(brojIndeksaInput) as HTMLInputElement;
        this._predmetiInput = document.getElementById(predmetiInput) as HTMLTextAreaElement;
        this._jumbo = document.getElementById(jumbo) as HTMLDivElement;        
        this.wireEvents();
    }

    wireEvents() {        

        document.getElementById("studentUnosBtn").addEventListener("click", () => {
            this.unosNovogStudenta();            
        });

        document.getElementById("predstavi").addEventListener("click", () => {
            this.predstaviSveStudente(StudentStorage.fioka);
        });

    }

    unosNovogStudenta() {
        StudentStorage.fioka.push(new Student(this._imeInput.value, this._prezimeInput.value, 
                this._fakultetInput.value, this._brojIndeksaInput.value, this._predmetiInput.value));                        
                alert("Student je uspesno unesen.");
                this.ocistiInputPolja();
    }

    ocistiInputPolja() {
        this._imeInput.value = "";
        this._prezimeInput.value = "";
        this._fakultetInput.value = "";
        this._brojIndeksaInput.value = "";
        this._predmetiInput.value = "";
    }

    predstaviSveStudente(studenti: Student[]) {
        if(studenti.length > 0) {
            let str = "";
            for (let student of studenti) {
                str += student.predstaviSe() + "\n";            
            }        
            this._jumbo.innerHTML = str;        
        } else {
            this._jumbo.innerHTML = "Nema unetih studenata.";
        }
        
    }
}


