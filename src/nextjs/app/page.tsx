"use client"

import { Controller, useForm } from "react-hook-form"
import "./globals.css"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  DdsChangeEvent,
  DdsInputEvent,
  DdsInvalidDateEvent,
} from "dap-design-system"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/hu"

import customParseFormat from "dayjs/plugin/customParseFormat" // ES 2015
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localeData)
dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
}

export type FormData = {
  name: string
  prefix: string
  email: string
  datepicker: Dayjs
  product: string
  subject?: string
  message: string
  consent: boolean
}

export default function Home() {
  let timeOutId: NodeJS.Timeout | number = 0

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      prefix: "",
      email: "",
      datepicker: dayjs(),
      product: "",
      subject: "",
      message: "",
      consent: false,
    },
  })

  const [governmentWindowId, setGovernmentWindowId] = useState<string | null>(
    "EXCID"
  )

  const [filter, setFilter] = useState("")

  const query = useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(filter),
  })

  const governmentWindows = [
    { id: "AXABU", name: "Budapest I. Kerületi Hivatal" },
    { id: "AXBAS", name: "Budapest II. Kerületi Hivatal" },
    { id: "AXCEB", name: "Budapest III. Kerületi Hivatal" },
    { id: "AXDIE", name: "Budapest IV. Kerületi Hivatal" },
    { id: "AXEGC", name: "Budapest V. Kerületi Hivatal" },
    { id: "AXFID", name: "Budapest I. Kerületi Hivatal" },
    {
      id: "AXFIK",
      name: "BUDAPEST VIII. KERÜLETI HIVATAL (KELETI PÁLYAUDVAR)",
    },
    { id: "AXFIN", name: "BUDAPEST VI. KERÜLETI HIVATAL (NYUGATI PÁLYAUDVAR)" },
    { id: "AXFIS", name: "Budapest VI. Kerületi Hivatal" },
    { id: "AXGEX", name: "Budapest VII. Kerületi Hivatal" },
    {
      id: "AXGUP",
      name: "BUDAPEST XVIII. KERÜLETI HIVATAL (GÉPJÁRMŰ ÜGYINTÉZÉSI PONT)",
    },
    { id: "AXHUK", name: "Budapest VIII. Kerületi Hivatal" },
    { id: "AXIKT", name: "Budapest IX. Kerületi Hivatal" },
    { id: "AXJUA", name: "Budapest X. Kerületi Hivatal" },
    { id: "AXKEP", name: "Budapest XI. Kerületi Hivatal" },
    { id: "AXLEZ", name: "Budapest XII. Kerületi Hivatal" },
    { id: "AXMEA", name: "Budapest XIII. Kerületi Hivatal" },
    { id: "AXNID", name: "Budapest XIV. Kerületi Hivatal" },
    { id: "AXPEL", name: "Budapest XV. Kerületi Hivatal" },
    { id: "AXRCJ", name: "Budapest XXI. Kerületi Hivatal" },
    { id: "AXSIP", name: "Budapest XVI. Kerületi Hivatal" },
    { id: "AXTAT", name: "Budapest XVII. Kerületi Hivatal" },
    { id: "AXUFK", name: "Budapest XVIII. Kerületi Hivatal" },
    { id: "AXVEI", name: "Budapest XIX. Kerületi Hivatal" },
    { id: "AXXBG", name: "Budapest XXII. Kerületi Hivatal" },
    { id: "AXYAE", name: "Budapest XXIII. Kerületi Hivatal" },
    { id: "AXZDF", name: "Budapest XX. Kerületi Hivatal" },
    { id: "BXADJ", name: "Komlói Járási Hivatal (Komló)" },
    { id: "BXBAT", name: "Mohácsi Járási Hivatal (Mohács)" },
    { id: "BXCAR", name: "Pécsváradi Járási Hivata (Pécsvárad)" },
    { id: "BXDAC", name: "Pécsi Járási Hivatal (Pécs)" },
    { id: "BXEKB", name: "Siklósi Járási Hivatal (Siklós)" },
    { id: "BXFAN", name: "Hegyháti Járási Hivatal (Sásd)" },
    { id: "BXGAV", name: "Szigetvári Járási Hivatal (Szigetvár)" },
    { id: "BXGUP", name: "Pécsi Járási Hivatal (Pécs)" },
    { id: "BXHAP", name: "Bólyi Járási Hivatal (Bóly)" },
    { id: "BXJAE", name: "Siklósi Járási Hivatal (Harkány)" },
    { id: "BXKAK", name: "Sellyei Járási Hivatal (Sellye)" },
    { id: "BXLAS", name: "Szentlőrinci Járási Hivatal (Szentlőrinc)" },
    { id: "BXMAH", name: "Siklósi Járási Hivatal (Villány)" },
    { id: "CXATB", name: "Csongrádi Járási Hivatal (Csongrád)" },
    {
      id: "CXBAU",
      name: "Hódmezővásárhelyi Járási Hivatal (Hódmezővásárhely)",
    },
    { id: "CXDAD", name: "Kisteleki Járási Hivatal (Kistelek)" },
    { id: "CXFAP", name: "Makói Járási Hivatal (Makó)" },
    { id: "CXGEA", name: "Szegedi Járási Hivatal (Szeged)" },
    { id: "CXJAF", name: "Szentesi Járási Hivatal (Szentes)" },
    { id: "CXKAL", name: "Mórahalmi Járási Hivatal (Mórahalom)" },
    { id: "CXLAT", name: "Hódmezővásárhelyi Járási Hivatal (Mindszent)" },
    { id: "CXSAN", name: "Szegedi Járási Hivatal (Sándorfalva)" },
    { id: "CXULL", name: "Mórahalmi Járási Hivatal (Üllés)" },
    { id: "DXBAV", name: "Bajai Járási Hivatal (Baja)" },
    { id: "DXBCJ", name: "Kunszentmiklósi Járási Hivatal (Szabadszállás)" },
    { id: "DXCAY", name: "Kalocsai Járási Hivatal (Kalocsa)" },
    { id: "DXDAE", name: "Kecskeméti Járási Hivatal (Kecskemét)" },
    { id: "DXFAS", name: "Kiskőrösi Járási Hivatal (Kiskőrös)" },
    { id: "DXGAH", name: "Kiskunfélegyházi Járási Hivatal (Kiskunfélegyháza)" },
    { id: "DXJAG", name: "Kiskunhalasi Járási Hivatal (Kiskunhalas)" },
    { id: "DXKAM", name: "Kunszentmiklósi Járási Hivatal (Kunszentmiklós)" },
    { id: "DXLAU", name: "Kiskőrösi Járási Hivatal (Izsák)" },
    { id: "DXMAX", name: "Bácsalmási Járási Hivatal (Bácsalmás)" },
    { id: "DXNBL", name: "Kalocsai Járási Hivatal (Solt)" },
    { id: "DXPAJ", name: "Kecskeméti Járási Hivatal (Lajosmizse)" },
    { id: "DXRBE", name: "Kecskeméti Járási Hivatal (Kerekegyháza)" },
    { id: "DXSAP", name: "Tiszakécskei Járási Hivatal (Tiszakécske)" },
    { id: "DXTAZ", name: "Kiskőrösi Járási Hivatal (Kecel)" },
    { id: "DXTOM", name: "Kiskunhalasi Járási Hivatal (Tompa)" },
    { id: "DXUAA", name: "Kiskőrösi Járási Hivatal (Soltvadkert)" },
    { id: "DXVAF", name: "Jánoshalmai Járási Hivatal (Jánoshalma)" },
    { id: "DXVEC", name: "Kunszentmiklósi Járási Hivatal (Dunavecse)" },
    { id: "DXZAL", name: "Kiskunmajsai Járási Hivatal (Kiskunmajsa)" },
    { id: "EXBAZ", name: "Békési Járási Hivatal (Békés)" },
    { id: "EXCID", name: "Békéscsabai Járási Hivatal (Békéscsaba)" },
    { id: "EXDAF", name: "Gyulai Járási Hivatal (Gyula)" },
    { id: "EXFAT", name: "Mezőkovácsházai Járási Hivatal (Mezőkovácsháza)" },
    { id: "EXGIA", name: "Orosházi Járási Hivatal (Orosháza)" },
    { id: "EXHAU", name: "Békési Járási Hivatal (Mezőberény)" },
    { id: "EXJEN", name: "Sarkadi Járási Hivatal (Sarkad)" },
    { id: "EXKAN", name: "Szarvasi Járási Hivatal (Szarvas)" },
    { id: "EXLAV", name: "Szeghalmi Járási Hivatal (Szeghalom)" },
    { id: "EXMAY", name: "Gyomaendrődi Járási Hivatal (Gyomaendrőd)" },
    { id: "EXNAE", name: "Gyulai Járási Hivatal (Elek)" },
    { id: "EXPAK", name: "Mezőkovácsházai Járási Hivatal (Battonya)" },
    { id: "EXSDN", name: "Mezőkovácsházai Járási Hivatal (Mezőhegyes)" },
    { id: "EXTAH", name: "Orosházi Járási Hivatal (Tótkomlós)" },
    { id: "EXUAB", name: "Szeghalmi Járási Hivatal (Füzesgyarmat)" },
    { id: "EXVAG", name: "Gyomaendrődi Járási Hivatal (Dévaványa)" },
    { id: "EXZCC", name: "Szeghalmi Járási Hivatal (Vésztő)" },
    { id: "FXBAH", name: "Bicskei Járási Hivatal (Bicske)" },
    { id: "FXCEG", name: "Dunaújvárosi Járási Hivatal (Dunaújváros)" },
    { id: "FXDAG", name: "Gárdonyi Járási Hivatal (Gárdony)" },
    { id: "FXFEX", name: "Móri Járási Hivatal (Mór)" },
    { id: "FXGED", name: "Sárbogárdi Járási Hivatal (Sárbogárd)" },
    { id: "FXHAV", name: "Martonvásári Járási Hivatal (Ercsi)" },
    { id: "FXJUF", name: "Székesfehérvári Járási Hivatal (Székesfehérvár)" },
    { id: "FXKAP", name: "Enyingi Járási Hivatal (Enying)" },
    { id: "FXLAZ", name: "Székesfehérvári Járási Hivatal (Polgárdi)" },
    { id: "FXMAR", name: "Martonvásári Járási Hivatal (Martonvásár)" },
    { id: "FXMEF", name: "Székesfehérvári Járási Hivatal (Aba)" },
    { id: "FXPAL", name: "Dunaújvárosi Járási Hivatal (Adony)" },
    { id: "GXBAR", name: "Csornai Járási Hivatal (Csorna)" },
    { id: "GXCA3", name: "Győri Járási Hivatal (Győr)" },
    { id: "GXCAC", name: "Győri Járási Hivatal (Győr)" },
    { id: "GXDAI", name: "Kapuvári Járási Hivatal (Kapuvár)" },
    { id: "GXFAV", name: "Mosonmagyaróvári Járási Hivatal (Mosonmagyaróvár)" },
    { id: "GXGAY", name: "Soproni Járási Hivatal (Sopron)" },
    { id: "GXHAZ", name: "Soproni Járási Hivatal (Fertőd)" },
    { id: "GXJAN", name: "Mosonmagyaróvári Járási Hivatal (Jánossomorja)" },
    { id: "GXKAS", name: "Pannonhalmi Járási Hivatal (Pannonhalma)" },
    { id: "GXLBD", name: "Téti Járási Hivatal (Tét)" },
    { id: "HXBAL", name: "Balmazújvárosi Járási Hivatal (Balmazújváros)" },
    { id: "HXBBV", name: "Hajdúszoboszlói Járási Hivatal (Nádudvar)" },
    { id: "HXCAT", name: "Berettyóújfalui Járási Hivatal (Berettyóújfalu)" },
    { id: "HXDAR", name: "Debreceni Járási Hivatal (Debrecen)" },
    { id: "HXFAI", name: "Hajdúböszörményi Járási Hivatal (Hajdúböszörmény)" },
    { id: "HXGAN", name: "Hajdúhadházi Járási Hivatal (Hajdúhadház)" },
    { id: "HXHAJ", name: "Balmazújvárosi Járási Hivatal (Tiszacsege)" },
    { id: "HXJAY", name: "Hajdúnánási Járási Hivatal (Hajdúnánás)" },
    { id: "HXKAE", name: "Hajdúszoboszlói Járási Hivatal (Hajdúszoboszló)" },
    { id: "HXKKX", name: "Berettyóújfalui Járási Hivatal (Komádi)" },
    { id: "HXLAK", name: "Derecskei Járási Hivatal (Derecske)" },
    { id: "HXLLL", name: "Nyíradonyi Járási Hivatal (Vámospércs)" },
    { id: "HXMAS", name: "Püspökladányi Járási Hivatal (Püspökladány)" },
    { id: "HXNAH", name: "Berettyóújfalui Járási Hivatal (Biharkeresztes)" },
    { id: "HXPAB", name: "Derecskei Járási Hivatal (Létavértes)" },
    { id: "HXTAM", name: "Nyíradonyi Járási Hivatal (Nyíradony)" },
    { id: "HXUAU", name: "Hajdúhadházi Járási Hivatal (Téglás)" },
    { id: "HXVAX", name: "Hajdúböszörményi Járási Hivatal (Hajdúdorog)" },
    { id: "HXZAD", name: "Hajdúnánási Járási Hivatal (Polgár)" },
    { id: "IXBCN", name: "Edelényi Járási Hivatal (Szendrő)" },
    { id: "IXCAD", name: "Edelényi Járási Hivatal (Edelény)" },
    { id: "IXDAJ", name: "Encsi Járási Hivatal (Encs)" },
    { id: "IXFAZ", name: "Kazincbarcikai Járási Hivatal (Kazincbarcika)" },
    { id: "IXFBC", name: "Kazincbarcikai Járási Hivatal (Sajószentpéter)" },
    { id: "IXGAA", name: "Mezőkövesdi Járási Hivatal (Mezőkövesd)" },
    { id: "IXHAH", name: "Szikszói Járási Hivatal (Szikszó)" },
    { id: "IXJA1", name: "Miskolci Járási Hivatal ( Miskolc KAB1)" },
    { id: "IXJA4", name: "Miskolci Járási Hivatal ( Miskolc KAB4)" },
    { id: "IXJAL", name: "Miskolci Járási Hivatal (Miskolc)" },
    { id: "IXJBV", name: "Miskolci Járási Hivatal (Felsőzsolca)" },
    { id: "IXKAT", name: "Ózdi Járási Hivatal (Ózd)" },
    { id: "IXLAR", name: "Sárospataki Járási Hivatal (Sárospatak)" },
    { id: "IXMAC", name: "Sátoraljaújhelyi Járási Hivatal (Sátoraljaújhely)" },
    { id: "IXNAI", name: "Szerencsi Járási Hivatal (Szerencs)" },
    { id: "IXNBS", name: "Tokaji Járási Hivatal (Tokaj)" },
    { id: "IXPAN", name: "Tiszaújvárosi Járási Hivatal (Tiszaújváros)" },
    { id: "IXRCT", name: "Ózdi Járási Hivatal (Borsodnádasd)" },
    { id: "IXSAV", name: "Putnoki Járási Hivatal (Putnok)" },
    { id: "IXTAY", name: "Mezőcsáti Járási Hivatal (Mezőcsát)" },
    { id: "IXTTN", name: "Gönci Járási Hivatal (Gönc)" },
    { id: "IXUDC", name: "Miskolci Járási Hivatal (Emőd)" },
    { id: "IXZEH", name: "Cigándi Járási Hivatal (Cigánd)" },
    { id: "JXBAY", name: "Egri Járási Hivatal (Eger)" },
    { id: "JXCAE", name: "Füzesabonyi Járási Hivatal (Füzesabony)" },
    { id: "JXDAK", name: "Gyöngyösi Járási Hivatal (Gyöngyös)" },
    { id: "JXFAH", name: "Hatvani Járási Hivatal (Hatvan)" },
    { id: "JXGAB", name: "Hevesi Járási Hivatal (Heves)" },
    { id: "JXHAR", name: "Pétervásárai Járási Hivatal (Pétervására)" },
    { id: "JXJAM", name: "Hatvani Járási Hivatal (Lőrinci)" },
    { id: "JXKEX", name: "Bélapátfalvai Járási Hivatal (Bélapátfalva)" },
    { id: "KXBAA", name: "Esztergomi Járási Hivatal (Dorog)" },
    { id: "KXDAL", name: "Kisbéri Járási Hivatal (Kisbér)" },
    { id: "KXFAR", name: "Komáromi Járási Hivatal (Komárom)" },
    { id: "KXGAC", name: "Oroszlányi Járási Hivatal (Oroszlány)" },
    { id: "KXHAX", name: "Tatai Járási Hivatal (Tata)" },
    { id: "KXJA2", name: "Tatabányai Járási Hivatal (Tatabánya)" },
    { id: "KXJAN", name: "Tatabányai Járási Hivatal (Tatabánya)" },
    { id: "KXLAY", name: "Esztergomi Járási Hivatal (Nyergesújfalu)" },
    { id: "KXNAI", name: "Komáromi Járási Hivatal (Bábolna)" },
    { id: "LXBAB", name: "Fehérgyarmati Járási Hivatal (Fehérgyarmat)" },
    { id: "LXBAL", name: "Nagykállói Járási Hivatal (Balkány)" },
    { id: "LXBBJ", name: "Tiszavasvári Járási Hivatal (Tiszalök)" },
    { id: "LXCAG", name: "Kisvárdai Járási Hivatal (Kisvárda)" },
    { id: "LXCBP", name: "Kisvárdai Járási Hivatal (Dombrád)" },
    { id: "LXDAM", name: "Mátészalkai Járási Hivatal (Mátészalka)" },
    { id: "LXFUZ", name: "Nyírbátori Járási Hivatal (Nyírbátor)" },
    { id: "LXGAD", name: "Nyíregyházi Járási Hivatal (Nyíregyháza)" },
    { id: "LXHAY", name: "Csengeri Járási Hivatal (Csenger)" },
    { id: "LXJAP", name: "Tiszavasvári Járási Hivatal (Tiszavasvári)" },
    { id: "LXKAZ", name: "Vásárosnaményi Járási Hivatal (Vásárosnamény)" },
    { id: "LXKEM", name: "Kemecsei Járási Hivatal (Kemecse)" },
    { id: "LXLAA", name: "Záhonyi Járási Hivatal (Záhony)" },
    { id: "LXMAF", name: "Mátészalkai Járási Hivatal (Nagyecsed)" },
    { id: "LXNAL", name: "Nyírbátori Járási Hivatal (Máriapócs)" },
    { id: "LXPAT", name: "Baktalórántházai Járási Hivatal (Baktalórántháza)" },
    { id: "LXRRG", name: "Kemecsei Járási Hivatal (Demecser)" },
    { id: "LXSAR", name: "Ibrányi Járási Hivatal (Ibrány)" },
    { id: "LXTAC", name: "Ibrányi Járási Hivatal (Nagyhalász)" },
    { id: "LXUAI", name: "Nagykállói Járási Hivatal (Nagykálló)" },
    { id: "LXVAN", name: "Nyíregyházi Járási Hivatal (Újfehértó)" },
    { id: "LXZAV", name: "Nyíregyházi Járási Hivatal (Rakamaz)" },
    { id: "MXBAC", name: "Karcagi Járási Hivatal (Karcag)" },
    { id: "MXBBK", name: "Karcagi Járási Hivatal (Kisújszállás)" },
    { id: "MXCAI", name: "Kunszentmártoni Járási Hivatal (Kunszentmárton)" },
    { id: "MXDAN", name: "Mezőtúri Járási Hivatal (Mezőtúr)" },
    { id: "MXFAY", name: "Szolnoki Járási Hivatal (Szolnok)" },
    { id: "MXGAE", name: "Tiszafüredi Járási Hivatal (Tiszafüred)" },
    { id: "MXHAA", name: "Kunhegyesi Járási Hivatal (Kunhegyes)" },
    {
      id: "MXJAS",
      name: "Törökszentmiklósi Járási Hivatal (Törökszentmiklós)",
    },
    { id: "MXKAH", name: "Jászberényi Járási Hivatal (Jászberény)" },
    { id: "MXLAB", name: "Mezőtúri Járási Hivatal (Túrkeve)" },
    { id: "MXMAG", name: "Szolnoki Járási Hivatal (Martfű)" },
    { id: "MXNAM", name: "Kunszentmártoni Járási Hivatal (Tiszaföldvár)" },
    { id: "MXPAU", name: "Szolnoki Járási Hivatal (Újszász)" },
    { id: "MXSAX", name: "Jászapáti Járási Hivatal (Jászapáti)" },
    { id: "MXTAD", name: "Jászberényi Járási Hivatal (Jászárokszállás)" },
    { id: "MXUAJ", name: "Jászberényi Járási Hivatal (Jászfényszaru)" },
    { id: "NXBAD", name: "Balassagyarmati Járási Hivatal (Balassagyarmat)" },
    { id: "NXCAJ", name: "Bátonyterenyei Járási Hivatal (Bátonyterenye)" },
    { id: "NXDAP", name: "Pásztói Járási Hivatal (Pásztó)" },
    { id: "NXFAA", name: "Rétsági Járási Hivatal (Rétság)" },
    { id: "NXGAF", name: "Salgótarjáni Járási Hivatal (Salgótarján)" },
    { id: "NXJAT", name: "Szécsényi Járási Hivatal (Szécsény)" },
    { id: "PXBAE", name: "Budakeszi Járási Hivatal (Budaörs)" },
    { id: "PXBCZ", name: "Pilisvörösvári Járási Hivatal (Pilisvörösvár)" },
    { id: "PXBDC", name: "Szigetszentmiklósi Járási Hivatal (Dunaharaszti)" },
    { id: "PXBFU", name: "Szobi Járási Hivatal (Nagymaros)" },
    { id: "PXCAK", name: "Ceglédi Járási Hivatal (Cegléd)" },
    { id: "PXCBU", name: "Ceglédi Járási Hivatal (Abony)" },
    { id: "PXDAS", name: "Dabasi Járási Hivatal (Dabas)" },
    { id: "PXDBX", name: "Gyáli Járási Hivatal (Gyál)" },
    { id: "PXERD", name: "Érdi Járási Hivatal (Érd)" },
    { id: "PXFAB", name: "Dunakeszi Járási Hivatal (Dunakeszi)" },
    { id: "PXFBJ", name: "Budakeszi Járási Hivatal (Budakeszi)" },
    { id: "PXGAG", name: "Érdi Járási Hivatal (Érd)" },
    { id: "PXGBP", name: "Érdi Járási Hivatal (Százhalombatta)" },
    { id: "PXHAJ", name: "Ráckevei Járási Hivatal (Ráckeve HAJÓ)" },
    { id: "PXHEV", name: "Ráckevei Járási Hivatal (Ráckeve HÉV)" },
    { id: "PXJAU", name: "Gödöllői Járási Hivatal (Gödöllő)" },
    { id: "PXJBA", name: "Aszódi Járási Hivatal (Aszód)" },
    { id: "PXJCI", name: "Gödöllői Járási Hivatal (Pécel)" },
    { id: "PXKAX", name: "Monori Járási Hivatal (Monor)" },
    { id: "PXKBF", name: "Szentendrei Járási Hivatal (Visegrád)" },
    { id: "PXLAD", name: "Nagykátai Járási Hivatal (Nagykáta)" },
    { id: "PXMAJ", name: "Nagykőrösi Járási Hivatal (Nagykőrös)" },
    { id: "PXNAP", name: "Ráckevei Járási Hivatal (Ráckeve)" },
    { id: "PXOCA", name: "Gyáli Járási Hivatal (Ócsa)" },
    { id: "PXPAZ", name: "Szentendrei Járási Hivatal (Szentendre)" },
    {
      id: "PXRAI",
      name: "Szigetszentmiklósi Járási Hivatal (Szigetszentmiklós)",
    },
    { id: "PXRRK", name: "Szigetszentmiklósi Járási Hivatal (Tököl)" },
    { id: "PXSAA", name: "Váci Járási Hivatal (Vác)" },
    { id: "PXSOB", name: "Váci Járási Hivatal (Vácrátót MÁV)" },
    { id: "PXSSG", name: "Monori Járási Hivatal (Gyömrő)" },
    { id: "PXSTO", name: "Váci Járási Hivatal (Vácrátót)" },
    { id: "PXTAH", name: "Szentendrei Járási Hivatal (Tahitótfalu)" },
    { id: "PXTAR", name: "Érdi Járási Hivatal (Tárnok)" },
    { id: "PXUAL", name: "Dunakeszi Járási Hivatala (Göd)" },
    { id: "PXUBV", name: "Szobi Járási Hivatal (Szob)" },
    { id: "PXUUI", name: "Vecsési Járási Hivatal (Vecsés)" },
    { id: "PXVAT", name: "Gödöllői Járási Hivatal (Veresegyház)" },
    { id: "PXZAR", name: "Szentendrei Járási Hivatal (Pomáz)" },
    { id: "PXZZJ", name: "Aszódi Járási Hivatal (Tura)" },
    { id: "SXBAF", name: "Barcsi Járási Hivatal (Barcs)" },
    { id: "SXCAL", name: "Fonyódi Járási Hivatal (Fonyód)" },
    { id: "SXCBV", name: "Fonyódi Járási Hivatal (Balatonboglár)" },
    { id: "SXCDJ", name: "Fonyódi Járási Hivatal (Balatonlelle)" },
    { id: "SXCET", name: "Fonyódi Járási Hivatal (Lengyeltóti)" },
    { id: "SXDA2", name: "Kaposvári Járási Hivatal (Kaposvár)" },
    { id: "SXDA3", name: "Kaposvári Járási Hivatal (Kaposvár)" },
    { id: "SXDAT", name: "Kaposvári Járási Hivatal (Kaposvár)" },
    { id: "SXFUY", name: "Marcali Járási Hivatal (Marcali)" },
    { id: "SXGBS", name: "Csurgói Járási Hivatal (Csurgó)" },
    { id: "SXGUE", name: "Nagyatádi Járási Hivatal (Nagyatád)" },
    { id: "SXJAV", name: "Siófoki Járási Hivatal (Siófok)" },
    { id: "SXJBB", name: "Siófoki Járási Hivatal (Balatonföldvár)" },
    { id: "SXKAY", name: "Tabi Járási Hivatal (Tab)" },
    { id: "SXLCZ", name: "Kaposvári Járási Hivatal (Nagybajom)" },
    { id: "TXBAG", name: "Bonyhádi Járási Hivatal (Bonyhád)" },
    { id: "TXCAM", name: "Dombóvári Járási Hivatal (Dombóvár)" },
    { id: "TXDAU", name: "Paksi Járási Hivatal (Paks)" },
    { id: "TXFAD", name: "Szekszárdi Járási Hivatal (Szekszárd)" },
    { id: "TXGAJ", name: "Tamási Járási Hivatal (Tamási)" },
    { id: "TXHAE", name: "Paksi Járási Hivatal (Dunaföldvár)" },
    { id: "TXJAZ", name: "Szekszárdi Járási Hivatal (Bátaszék)" },
    { id: "TXKAA", name: "Tolnai Járási Hivatal (Tolna)" },
    { id: "TXLAF", name: "Tamási Járási Hivatal (Simontornya)" },
    { id: "UXBAI", name: "Ajkai Járási Hivatal (Ajka)" },
    { id: "UXBER", name: "Várpalotai Járási Hivatal (Berhida)" },
    { id: "UXCAN", name: "Balatonalmádi Járási Hivatal (Balatonalmádi)" },
    { id: "UXDAV", name: "Balatonfüredi Járási Hivatal (Balatonfüred)" },
    { id: "UXFAE", name: "Pápai Járási Hivatal (Pápa)" },
    { id: "UXGAK", name: "Tapolcai Járási Hivatal (Tapolca)" },
    { id: "UXJAH", name: "Várpalotai Járási Hivatal (Várpalota)" },
    { id: "UXKA2", name: "Veszprémi Járási Hivatal (Veszprém)" },
    { id: "UXKAB", name: "Veszprémi Járási Hivatal (Veszprém)" },
    { id: "UXKBJ", name: "Zirci Járási Hivatal (Zirc)" },
    { id: "UXLAG", name: "Devecseri Járási Hivatal (Devecser)" },
    { id: "UXMAM", name: "Balatonalmádi Járási Hivatal (Balatonfűzfő)" },
    { id: "UXNAU", name: "Sümegi Járási Hivatal (Sümeg)" },
    { id: "UXPAX", name: "Veszprémi Járási Hivatal (Herend)" },
    { id: "VXBAJ", name: "Celldömölki Járási Hivatal (Celldömölk)" },
    { id: "VXBUK", name: "Kőszegi Járási Hivatal (Bük)" },
    { id: "VXCAP", name: "Körmendi Járási Hivatal (Körmend)" },
    { id: "VXCBR", name: "Szentgotthárdi Járási Hivatal (Szentgotthárd)" },
    { id: "VXDAZ", name: "Kőszegi Járási Hivatal (Kőszeg)" },
    { id: "VXFAF", name: "Sárvári Járási Hivatal (Sárvár)" },
    { id: "VXGA2", name: "Szombathelyi Járási Hivatal (Szombathely)" },
    { id: "VXGA3", name: "Szombathelyi Járási Hivatal (Szombathely)" },
    { id: "VXGAL", name: "Szombathelyi Járási Hivatal (Szombathely)" },
    { id: "VXJAR", name: "Vasvári Járási Hivatal (Vasvár)" },
    { id: "VXKAC", name: "Kőszegi Járási Hivatal (Csepreg)" },
    { id: "VXLEN", name: "Körmendi Járási Hivatal (Őriszentpéter)" },
    { id: "VXMBH", name: "Sárvári Járási Hivatal (Répcelak)" },
    { id: "ZXBAK", name: "Keszthelyi Járási Hivatal (Keszthely)" },
    { id: "ZXBCA", name: "Zalaszentgróti Járási Hivatal (Zalaszentgrót)" },
    { id: "ZXCAS", name: "Lenti Járási Hivatal (Lenti)" },
    { id: "ZXDAH", name: "Nagykanizsai Járási Hivatal (Nagykanizsa)" },
    { id: "ZXFAG", name: "Zalaegerszegi Járási Hivatal (Zalaegerszeg)" },
    { id: "ZXGAM", name: "Keszthelyi Járási Hivatal (Hévíz)" },
    { id: "ZXHAI", name: "Letenyei Járási Hivatal (Letenye)" },
    { id: "ZXJAL", name: "Zalaegerszegi Járási Hivatal (Pacsa)" },
    { id: "ZXJAX", name: "Nagykanizsai Járási Hivatal (Zalakaros)" },
    { id: "ZXKAD", name: "Zalaegerszegi Járási Hivatal (Zalalövő)" },
  ]

  const getProducts = async (filter: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${filter}`
    )
    const json = await response.json()

    return json.products.filter((item: Product) =>
      item.title.toLowerCase().startsWith(filter.toLowerCase())
    )
  }

  const onSubmit = (data: FormData) => {
    console.log("data", data)
    if (window.showDapSnackbar) {
      window.showDapSnackbar("Gratulálunk! Minden mező helyes!", {
        duration: 4500,
        alertType: "successful",
        actions: [
          { href: "https://sg.hu", text: "SG" },
          { href: "https://index.hu", text: "Index" },
        ],
      })
    }
  }

  return (
    <div>
      <dap-ds-button
        variant="primary"
        size="md"
        onkeydown={(e: KeyboardEvent) => console.log(e)}
      >
        Click me
      </dap-ds-button>
      <button
        onClick={() => {
          setValue("datepicker", dayjs())
        }}
      >
        Küldés
      </button>
      <dap-ds-file-input
        size="xs"
        id="fileInput"
        accept=".pdf"
        keepValue
        multiple
        maxFiles={5}
        maxFileSize={30 * 1024 * 1024}
        showDropzone
        showUploadButton="false"
        maxFileSizeErrorText="Túl nagy méretű dokumentum"
        fileTypeErrorText="A formátum nem megfelelő"
        ondds-file-change={(
          e: CustomEvent<{
            newFiles: File[]
            files: File[]
            canceledFiles: Set<File>
            currentFiles: File[]
          }>
        ) => {
          const files = e.detail.currentFiles
          const canceledFiles = e.detail.canceledFiles
          const newFiles = e.detail.newFiles
          const existingNames = new Set(files.map((f: File) => f.name))

          const uniqueFiles: File[] = []
          const duplicates: Set<File> = new Set()

          for (const file of newFiles) {
            if (existingNames.has(file.name)) {
              duplicates.add(file)
            } else {
              uniqueFiles.push(file)
            }
          }

          canceledFiles.clear()
          for (const file of duplicates) {
            canceledFiles.add(file)
          }

          console.log("ondds-file-change", {
            files,
            canceledFiles,
            uniqueFiles,
          })

          if (canceledFiles.size > 0) {
            const invalidFiles = Array.from(canceledFiles).map((file) => ({
              file,
              message: "Egyszerre nem tölthető fel két azonos nevű fájl.",
              type: "duplicate",
              name: file.name,
            }))

            console.log("invalidFiles", invalidFiles)
          }
        }}
      >
        <div slot="dropzone-content">
          <div>
            <dap-ds-form-label
              for="fileInput"
              size="lg"
              label="Válaszd ki vagy húzd ide a dokumentumokat"
            ></dap-ds-form-label>
            <dap-ds-typography variant="description" size="md">
              Legfeljebb 5 darab, egyenként 30 MB méretű PDF-et
            </dap-ds-typography>
          </div>
          <dap-ds-button size="lg" variant="outline">
            <div className="button-flex-wrapper">Dokumentumok kiválasztása</div>
          </dap-ds-button>
        </div>
      </dap-ds-file-input>
      <dap-ds-file-input-list
        for="fileInput"
        showFileSize="false"
        showThumbnail="true"
        showFileLink="true"
        fileLinkLabel="Megnézem"
      ></dap-ds-file-input-list>
      <dap-ds-datepicker
        id="datepicker"
        label="Születési dátum"
        description="Add meg a születési dátumod!"
        name="datepicker"
        value={dayjs().add(1, "month")}
        maxDate={dayjs().endOf("day")}
        minDate={dayjs().subtract(1, "month")}
        disabledDate={(date: Dayjs) => {
          return date.isAfter(dayjs().add(5, "days"))
        }}
        locale="hu"
        feedback={errors?.datepicker?.message?.toString()}
        feedbackType={errors?.datepicker ? "negative" : "positive"}
        ondds-change={(e: DdsChangeEvent) => {
          setValue("datepicker", e.detail.value, {
            shouldValidate: true,
          })
        }}
        ondds-invaliddate={(e: DdsInvalidDateEvent) => {
          if (e.detail.type === "invalid") {
            setError("datepicker", {
              message: `Érvénytelen dátum: ${
                dayjs.Ls[dayjs.locale()].formats.L
              }`,
            })
          }

          if (e.detail.type === "out-of-range") {
            setError("datepicker", {
              message: "Nem választható dátum!",
            })
          }
        }}
        ondds-validdate={() => {
          setError("datepicker", { message: "" })
        }}
      ></dap-ds-datepicker>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <dap-ds-stack>
          <dap-ds-combobox
            allowManualInput
            label={"governmentWindow"}
            value={governmentWindowId ?? ""}
            ondds-change={(e: DdsChangeEvent) => {
              setGovernmentWindowId(e.detail.value)
            }}
          >
            {governmentWindows.map(({ id, name }) => (
              <dap-ds-option-item key={id} value={id}>
                {name}
              </dap-ds-option-item>
            ))}
          </dap-ds-combobox>

          <Controller
            name="name"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="name"
                label="Teljes név"
                name="name"
                value={value}
                feedback={errors?.name?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("name", e.detail.value, { shouldValidate: true })
                }}
                ondds-input={(e: DdsInputEvent) => {
                  console.log(e.detail.input)
                }}
              ></dap-ds-input>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg a teljes neved!"
                },
              },
            }}
          />
          <dap-ds-number-input
            id="number"
            label="Number"
            name="name"
            ondds-change={(e: DdsChangeEvent) => {
              console.log(e.detail.value)
            }}
            ondds-input={(e: DdsInputEvent) => {
              console.log(e.detail.value)
            }}
          ></dap-ds-number-input>
          <Controller
            name="prefix"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-select
                id="prefix"
                label="Megnevezés"
                name="prefix"
                value={value}
                autocomplete="off"
                feedback={errors?.prefix?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("prefix", e.detail.value)
                }}
              >
                <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
                <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
                <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
              </dap-ds-select>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Válassz megnevezést!"
                },
              },
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="email"
                label="E-mail cím"
                name="email"
                value={value}
                type="email"
                feedback={errors?.email?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("email", e.detail.value, { shouldValidate: true })
                }}
              ></dap-ds-input>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg az e-mail címed!"
                },
                pattern: (value) => {
                  if (!value.match(/[^@\s]+@[^@\s]+\.[^@\s]+/))
                    return "Az e-mail cím formátuma helytelen!"
                },
              },
            }}
          />
          <Controller
            name="datepicker"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-datepicker
                id="datepicker"
                label="Születési dátum"
                description="Add meg a születési dátumod!"
                name="datepicker"
                value={value}
                locale="hu"
                feedback={errors?.datepicker?.message?.toString()}
                feedbackType={errors?.datepicker ? "negative" : "positive"}
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("datepicker", e.detail.value, {
                    shouldValidate: true,
                  })
                }}
                ondds-invaliddate={(e: DdsInvalidDateEvent) => {
                  if (e.detail.type === "invalid") {
                    setError("datepicker", {
                      message: `Érvénytelen dátum: ${
                        dayjs.Ls[dayjs.locale()].formats.L
                      }`,
                    })
                  }

                  if (e.detail.type === "out-of-range") {
                    setError("datepicker", {
                      message: "Nem választható dátum!",
                    })
                  }
                }}
                ondds-validdate={() => {
                  setError("datepicker", { message: "" })
                }}
              ></dap-ds-datepicker>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg a születési dátumod!"
                },
              },
            }}
          />
          <Controller
            name="product"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-combobox
                id="product"
                label="Kedvenc terméked"
                name="product"
                value={value}
                autocomplete="off"
                feedback={errors?.product?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  console.log(e.detail?.value)
                  setValue("product", e.detail?.value)
                }}
                ondds-input={(e: DdsInputEvent) => {
                  const productFilter = e?.detail?.input
                  if (productFilter) {
                    clearTimeout(timeOutId)
                    timeOutId = setTimeout(() => {
                      setFilter(productFilter)
                    }, 300)
                  }
                }}
                sync
                placeholder="Válassz egy terméket"
              >
                {query.data?.map((item: Product) => (
                  <dap-ds-option-item
                    key={item.id}
                    value={item.id}
                    label={item.title}
                  >
                    {item.title}
                  </dap-ds-option-item>
                ))}
              </dap-ds-combobox>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Válassz egy terméket!"
                },
              },
            }}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="subject"
                label="Tárgy"
                optional
                optionalLabel="(Nem kötelező)"
                name="subject"
                value={value}
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("subject", e.detail.value)
                }}
              ></dap-ds-input>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-textarea
                id="message"
                label="Üzenet"
                name="message"
                value={value}
                feedback={errors?.message?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("message", e.detail.value, { shouldValidate: true })
                }}
              ></dap-ds-textarea>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Írd be az üzeneted!"
                },
              },
            }}
          />
          <Controller
            name="consent"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-checkbox
                id="consent"
                label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
                name="consent"
                checked={value}
                feedback={errors?.consent?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("consent", e.detail.checked, {
                    shouldValidate: true,
                  })
                }}
              ></dap-ds-checkbox>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Fogadd el az Adatkezelési tájékoztatót!"
                },
              },
            }}
          />
          <dap-ds-button htmlType="submit">Küldés</dap-ds-button>
        </dap-ds-stack>
      </form>
    </div>
  )
}
