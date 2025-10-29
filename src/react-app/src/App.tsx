import {
  DapDSButtonReact,
  DapDSCheckboxReact,
  DapDSComboboxReact,
  DapDSDatePickerReact,
  DapDSInputReact,
  DapDSOptionItemReact,
  DapDSSelectReact,
  DapDSStackReact,
  DapDSTextareaReact,
  DapDSFileInputReact,
  SystemInformationLineReact,
  DapDSIconReact,
  DapDSFileInputListReact,
} from "dap-design-system/react"
import "./App.css"
import { Controller, useForm } from "react-hook-form"
import dayjs from "dayjs"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"

import customParseFormat from "dayjs/plugin/customParseFormat" // ES 2015
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import { DapDSInput } from "dap-design-system"

dayjs.extend(localeData)
dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

function App() {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
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

  const [fruits, setFruits] = useState<string[]>([])
  const [selectedFruit, setSelectedFruit] = useState<string | undefined>()
  // betöltés szimulálása
  useEffect(() => {
    setFruits(["Alma", "Banán", "Körte", "Szilva", "Szőlő"])
    setSelectedFruit("Alma")
  }, [])

  const [filter, setFilter] = useState("")

  const [governmentWindowId, setGovernmentWindowId] = useState<string | undefined>(
    "EXCID"
  )
  const [governmentWindow, setGovernmentWindow] = useState<any[]>([])

  useEffect(() => {
    setTimeout(() => setGovernmentWindow(governmentWindows), 2000)
  }, [])

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

    return json.products.filter((item: any) =>
      item.title.toLowerCase().startsWith(filter.toLowerCase())
    )
  }

  const onSubmit = (data: any) => {
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
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DapDSButtonReact
          onClick={() => console.log("click")}
          onKeyDown={(e: any) => console.log(e)}
        >
          Click me
        </DapDSButtonReact>
        <SystemInformationLineReact />
        <DapDSStackReact>
          <DapDSFileInputReact
            id="thumbnailTest"
            description="Test thumbnail previews with different file types"
            accept="image/*,.pdf,.doc,.docx,.txt,.mp4,.mp3"
            label="Thumbnail Preview Test"
            multiple
            showDropzone
            name="thumbnailTest"
            showUploadButton="false"
            showBrowseButton="false"
          >
            <div slot="dropzone-content">
              <DapDSIconReact name="upload-2-line" size="lg"></DapDSIconReact>
              Drop files here to test thumbnails (images, documents, videos,
              audio)
            </div>
          </DapDSFileInputReact>
          <DapDSFileInputListReact
            id="fileInputList"
            size="md"
            for="thumbnailTest"
            label="Files with Thumbnails"
            showDeleteButton="true"
            showThumbnail="true"
            fileLinkLabel="Viewka"
            thumbnailSize="md"
          >
            <DapDSButtonReact slot="link" onClick={() => console.log("delete")}>
              laci
              <DapDSIconReact name="delete-bin-line"></DapDSIconReact>
            </DapDSButtonReact>
          </DapDSFileInputListReact>
        </DapDSStackReact>
        <DapDSComboboxReact
          label="Gyümölcsök"
          sync
          value={selectedFruit}
          onDdsChange={(event: CustomEvent) => {
            setSelectedFruit(event.detail?.value)
          }}
          onDdsClear={() => {
            setSelectedFruit(undefined)
          }}
        >
          {fruits.map((fruit) => (
            <DapDSOptionItemReact key={fruit} value={fruit}>
              {fruit}
            </DapDSOptionItemReact>
          ))}
        </DapDSComboboxReact>
        <DapDSStackReact>
          <DapDSComboboxReact
            label="DapDSComboboxReact"
            placeholder="Válassz egy kormányablakot!"
            sync
            value={governmentWindowId}
            onDdsChange={(event: CustomEvent) => {
              setGovernmentWindowId(event.detail?.value ?? null)
            }}
          >
            {governmentWindow.map(({ id, name }) => (
              <DapDSOptionItemReact key={id} value={id}>
                {name}
              </DapDSOptionItemReact>
            ))}
          </DapDSComboboxReact>
          <DapDSSelectReact
            label="DapDSSelectReact"
            placeholder="Válassz egy kormányablakot!"
            sync
            value={governmentWindowId}
            onDdsChange={(event: CustomEvent) => {
              setGovernmentWindowId(event.detail.value)
            }}
          >
            {governmentWindow.map(({ id, name }) => (
              <DapDSOptionItemReact key={id} value={id}>
                {name}
              </DapDSOptionItemReact>
            ))}
          </DapDSSelectReact>
          <Controller
            name="name"
            control={control}
            render={({ field: { value } }) => (
              <DapDSInputReact
                id="name"
                label="Teljes név"
                name="name"
                value={value}
                feedback={errors?.name?.message?.toString()}
                feedbackType="negative"
                onKeyDown={(e: any) => {
                  console.log(e)
                }}
                onKeyUp={(e: any) => {
                  console.log(e)
                }}
                onDdsChange={(e: CustomEvent) => {
                  setValue("name", e.detail.value, { shouldValidate: true })
                }}
              ></DapDSInputReact>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg a teljes neved!"
                },
              },
            }}
          />
          <Controller
            name="prefix"
            control={control}
            render={({ field: { value } }) => (
              <DapDSSelectReact
                id="prefix"
                label="Megnevezés"
                name="prefix"
                value={value}
                feedback={errors?.prefix?.message?.toString()}
                feedbackType="negative"
                onDdsChange={(e: CustomEvent) => {
                  setValue("prefix", e.detail.value)
                }}
              >
                <DapDSOptionItemReact value="mr">Úr</DapDSOptionItemReact>
                <DapDSOptionItemReact value="mrs">Hölgy</DapDSOptionItemReact>
                <DapDSOptionItemReact value="miss">
                  Kisasszony
                </DapDSOptionItemReact>
              </DapDSSelectReact>
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
              <DapDSInputReact
                id="email"
                label="E-mail cím"
                name="email"
                value={value}
                type="email"
                feedback={errors?.email?.message?.toString()}
                feedbackType="negative"
                onDdsChange={(e: CustomEvent) => {
                  setValue("email", e.detail.value, { shouldValidate: true })
                }}
              ></DapDSInputReact>
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
              <DapDSDatePickerReact
                id="datepicker"
                label="Születési dátum"
                description="Add meg a születési dátumod!"
                name="datepicker"
                value={value}
                feedback={errors?.datepicker?.message?.toString()}
                feedbackType={errors?.datepicker ? "negative" : "positive"}
                onDdsChange={(e: CustomEvent) => {
                  console.log(e)
                  setValue("datepicker", e.detail.value, {
                    shouldValidate: true,
                  })
                }}
                onDdsInvalidDate={(e: CustomEvent) => {
                  console.log(e)
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
                onDdsValidDate={(e: CustomEvent) => {
                  console.log(e)
                  setError("datepicker", { message: "" })
                }}
              ></DapDSDatePickerReact>
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
              <DapDSComboboxReact
                id="product"
                label="Kedvenc terméked"
                name="product"
                value={value}
                feedback={errors?.product?.message?.toString()}
                feedbackType="negative"
                onDdsChange={(e: CustomEvent) => {
                  setValue("product", e.detail?.value)
                }}
                onDdsInput={(e: CustomEvent) => {
                  setFilter(e.detail?.input)
                }}
                sync
                placeholder="Válassz egy terméket"
              >
                {query.data?.map((item: any) => (
                  <DapDSOptionItemReact
                    key={item.id}
                    value={item.id}
                    label={item.title}
                  >
                    {item.title}
                  </DapDSOptionItemReact>
                ))}
              </DapDSComboboxReact>
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
              <DapDSInputReact
                id="subject"
                label="Tárgy"
                optional
                optionalLabel="(Nem kötelező)"
                name="subject"
                value={value}
                onDdsChange={(e: CustomEvent) => {
                  setValue("subject", e.detail.value)
                }}
              ></DapDSInputReact>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field: { value } }) => (
              <DapDSTextareaReact
                id="message"
                label="Üzenet"
                name="message"
                value={value}
                feedback={errors?.message?.message?.toString()}
                feedbackType="negative"
                onDdsChange={(e: CustomEvent) => {
                  setValue("message", e.detail.value, { shouldValidate: true })
                }}
              ></DapDSTextareaReact>
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
              <DapDSCheckboxReact
                id="consent"
                label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
                name="consent"
                checked={value}
                feedback={errors?.consent?.message?.toString()}
                feedbackType="negative"
                onDdsChange={(e: CustomEvent) => {
                  setValue("consent", e.detail.checked, {
                    shouldValidate: true,
                  })
                }}
              ></DapDSCheckboxReact>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Fogadd el az Adatkezelési tájékoztatót!"
                },
              },
            }}
          />
          <DapDSButtonReact htmlType="submit">Küldés</DapDSButtonReact>
        </DapDSStackReact>
      </form>
    </div>
  )
}

export default App
