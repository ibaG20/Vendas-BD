/* export interface Venda {
    ven_codigo: number;
    ven_horario: string;
    ven_valor_total: number;
    tb_funcionarios_fun_codigo: number;
    itens: Item[];
}

export interface Item {
    ite_codigo: number;
    ite_quantidade: number;
    ite_valor_parcial: number;
    tb_produtos_pro_codigo: number;
}
 */

export interface Venda {
    ven_codigo: any;
    ven_horario: string;
    ven_valor_total: any;
    tb_funcionarios_fun_codigo: any;
    itens: Item[];
}

export interface Item {
    ite_codigo: any;
    ite_quantidade: any;
    ite_valor_parcial: any;
    tb_produtos_pro_codigo: any;
}
